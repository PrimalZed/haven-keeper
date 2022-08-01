import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concat, from, fromEvent, merge, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { loadTabletop, TabletopActions } from 'store/tabletop/tabletop.actions';
import { selectTabletopState } from 'store/tabletop/tabletop.selectors';
import {
  closeAllConnectionsSuccess,
  closeConnection,
  closeConnectionSuccess,
  guestChannelSuccess,
  guestDisconnected,
  hostDisconnected,
  leave,
  receiveGuestAnswer,
  receiveHostOffer,
  receiveHostOfferSuccess,
  startGuestConnection,
  startGuestConnectionSuccess
} from './p2p.actions';
import { selectHostGuestConnections, selectHostP2pState, selectP2pState } from './p2p.selectors';

@Injectable()
export class P2pEffects {
  startGuestConnection$ = createEffect(() => this.actions$
    .pipe(
      ofType(startGuestConnection),
      map(() => new RTCPeerConnection()),
      tap((connection) => {
        connection.addEventListener('signalingstatechange', () => {
          console.log('guest signaling state change', connection.signalingState);
        });
        connection.addEventListener('iceconnectionstatechange', () => {
          console.log('guest connection state change', connection.iceConnectionState);
        });
      }),
      map((connection) => ({
        connection,
        channel: connection.createDataChannel('tabletopActions'),
        ice$: fromEvent<RTCPeerConnectionIceEvent>(connection, 'icecandidate')
         .pipe(
            // Firing this callback with a null candidate indicates that
            // trickle ICE gathering has finished, and all the candidates
            // are now present in pc.localDescription.  Waiting until now
            // to create the offer might help firefox.
            filter((iceEvent) => !iceEvent.candidate),
            take(1)
          ),
        disconnected$: fromEvent(connection, 'iceconnectionstatechange')
          .pipe(
            filter(() => connection.iceConnectionState === 'disconnected'),
            take(1),
            map(() => guestDisconnected({ remoteDescription: connection.currentRemoteDescription?.sdp as string }))
          )
      })),
      switchMap(({ connection, channel, ice$, disconnected$ }) => concat(
        from(connection.createOffer())
          .pipe(
            switchMap((offer) => connection.setLocalDescription(offer)),
            switchMap(() => ice$),
            map(() => startGuestConnectionSuccess({
              connection,
              channel
            }))
          ),
        disconnected$
      ))
    )
  );

  processHostOffer$ = createEffect(() => this.actions$
    .pipe(
      ofType(receiveHostOffer),
      map(({ offer }) => ({
        connection: new RTCPeerConnection(),
        offer
      })),
      tap(({ connection }) => {
        connection.addEventListener('signalingstatechange', () => {
          console.log('host signaling state change', connection.signalingState);
        });
        connection.addEventListener('iceconnectionstatechange', () => {
          console.log('host connection state change', connection.iceConnectionState);
        });
      }),
      map(({ connection, offer }) => ({
        connection,
        offer,
        ice$: fromEvent<RTCPeerConnectionIceEvent>(connection, 'icecandidate')
          .pipe(
            // Firing this callback with a null candidate indicates that
            // trickle ICE gathering has finished, and all the candidates
            // are now present in pc.localDescription.  Waiting until now
            // to create the answer saves us from having to send offer +
            // answer + iceCandidates separately.
            filter((iceEvent) => !iceEvent.candidate),
            take(1)
          ),
        dataChannel$: fromEvent<RTCDataChannelEvent>(connection, 'datachannel')
          .pipe(
            map((channelEvent) => guestChannelSuccess({ channel: channelEvent.channel }))
          ),
        disconnected$: fromEvent(connection, 'iceconnectionstatechange')
          .pipe(
            filter(() => connection.iceConnectionState === 'disconnected'),
            take(1),
            map(() => hostDisconnected())
          )
      })),
      switchMap(({ connection, offer, ice$, dataChannel$, disconnected$ }) => concat(
        from(connection.setRemoteDescription({ type: 'offer', sdp: offer }))
          .pipe(
            switchMap(() => from(connection.createAnswer())),
            switchMap((answer) => connection.setLocalDescription(answer)),
            switchMap(() => ice$),
            map(() => receiveHostOfferSuccess({ connection }))
        ),
        merge(dataChannel$, disconnected$)
      ))
    )
  );

  processGuestAnswer$ = createEffect(
    () => this.actions$.pipe(
      ofType(receiveGuestAnswer),
      withLatestFrom(this.store.select(selectHostGuestConnections)),
      map(([{ index, answer }, guestConnections]) => ({
        answer,
        guestConnection: guestConnections[index]
      })),
      mergeMap(({ answer, guestConnection }) => from(guestConnection.connection.setRemoteDescription({ type: 'answer', sdp: answer }))
        .pipe(
          mergeMap(() => guestConnection.channel.readyState === 'open'
            ? of(void(0))
            : fromEvent(guestConnection.channel, 'open').pipe(map(() => void(0)))
          ),
          withLatestFrom(this.store.select(selectTabletopState)),
          tap(([_, tabletopState]) => {
            guestConnection.channel.send(JSON.stringify(loadTabletop({ state: tabletopState })));
          })
        )
      )
    ),
    { dispatch: false }
  );

  propagateToGuests$ = createEffect(
    () => this.actions$.pipe(
      ofType(...TabletopActions),
      map((action) => JSON.stringify(action)),
      withLatestFrom(this.store.select(selectHostGuestConnections)),
      map(([actionJson, connections]) => ({
        actionJson,
        channels: connections
          .map((connection) => connection.channel)
          .filter((channel) => channel.readyState === 'open')
      })),
      switchMap(({ actionJson, channels }) => from(channels)
        .pipe(
          map((channel) => ({ actionJson, channel }))
        )
      ),
      tap(({ actionJson, channel }) => {
        channel.send(actionJson);
      })
    ),
    { dispatch: false }
  );

  closeConnection$ = createEffect(() => this.actions$
    .pipe(
      ofType(closeConnection),
      withLatestFrom(this.store.select(selectHostP2pState)),
      tap(([{ index }, hostP2pState]) => {
        const connection = hostP2pState?.guestConnectionSets[index];
        connection?.channel.close();
        connection?.connection.close();
      }),
      map(([{ index }]) => closeConnectionSuccess({ index }))
    )
  );

  closeAllConnections$ = createEffect(() => this.actions$
    .pipe(
      ofType(leave),
      withLatestFrom(this.store.select(selectP2pState)),
      tap(([_, p2pState]) => {
        switch (p2pState.role) {
          case 'host':
            p2pState.guestConnectionSets
              .forEach((connection) => {
                connection.channel.close();
                connection.connection.close();
              });
            break;
          case 'guest':
            p2pState.channel?.close();
            p2pState.connection?.close();
        }
      }),
      map(() => closeAllConnectionsSuccess())
    )
  );

  constructor(private actions$: Actions, private store: Store<AppState>) { }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concat, from, fromEvent } from 'rxjs';
import { filter, map, mergeMap, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { loadTabletop } from 'store/tabletop/tabletop.actions';
import { selectTabletopState } from 'store/tabletop/tabletop.selectors';
import {
  receiveGuestAnswer,
  receiveHostOffer,
  receiveHostOfferSuccess,
  startGuestConnection,
  startGuestConnectionSuccess
} from './p2p.actions';
import { selectHostGuestConnections } from './p2p.selectors';

@Injectable()
export class P2pEffects {
  startGuestConnection$ = createEffect(() => this.actions$
    .pipe(
      ofType(startGuestConnection),
      map(() => new RTCPeerConnection()),
      tap((connection) => {
        connection.onsignalingstatechange = () => {
          console.log("guest connection state change", connection.signalingState);
        };
      }),
      map((connection) => ({
        connection,
        channel: connection.createDataChannel('tabletopActions')
      })),
      switchMap(({ connection, channel }) => from(connection.createOffer())
        .pipe(
          switchMap((offer) => connection.setLocalDescription(offer)),
          map(() => ({ connection, channel }))
        )
      ),
      map(({ connection, channel }) => startGuestConnectionSuccess({
        connection,
        channel
      }))
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
        connection.onsignalingstatechange = () => {
          console.log("host connection state change", connection.signalingState);
        };
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
            tap((channelEvent) => {
              channelEvent.channel.onopen = () => {
                console.log(`data channel ${channelEvent.channel.label} opened`);
              };
            }),
            switchMap((channelEvent) => {
              const channelClose$ = fromEvent(channelEvent.channel, 'close')
                .pipe(
                  tap(() => {
                    console.log(`data channel ${channelEvent.channel.label} closed`);
                  }),
                  take(1)
                );

              return fromEvent<MessageEvent<string>>(channelEvent.channel, 'message')
                .pipe(
                  takeUntil(channelClose$),
                  map((messageEvent) => JSON.parse(messageEvent.data))
                );
            })
          )
      })),
      switchMap(({ connection, offer, ice$, dataChannel$ }) => concat(
        from(connection.setRemoteDescription({ type: 'offer', sdp: offer }))
          .pipe(
            switchMap(() => from(connection.createAnswer())),
            switchMap((answer) => connection.setLocalDescription(answer)),
            switchMap(() => ice$),
            map(() => connection.currentLocalDescription?.sdp as string),
            map((answer) => receiveHostOfferSuccess({ connection, answer }))
        ),
        dataChannel$
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
          mergeMap(() => fromEvent(guestConnection.channel, 'open')),
          withLatestFrom(this.store.select(selectTabletopState)),
          tap(([_, tabletopState]) => {
            guestConnection.channel.send(JSON.stringify(loadTabletop({ state: tabletopState })));
          })
        )
      )
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store<AppState>) { }
}

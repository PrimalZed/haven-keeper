import { Injectable, OnDestroy } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { from, fromEvent, merge, Subject } from 'rxjs';
import { distinct, filter, map, mergeMap, skipUntil, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { selectGuestChannel, selectHostGuestConnections, selectP2pRole } from 'store/p2p/p2p.selectors';

@Injectable({ providedIn: 'root' })
export class TabletopService implements OnDestroy {
  private role: 'host' | 'guest' | null = null;

  private captureRole$ = this.store.select(selectP2pRole)
    .pipe(
      tap((role) => {
        this.role = role;
      })
    );

  private dispatchFromGuest$ = this.store.select(selectHostGuestConnections)
    .pipe(
      map((connections) => connections.map((connection) => connection.channel)),
      switchMap((channels) => from(channels)),
      distinct(),
      mergeMap((channel) => {
        const channelOpen$ = fromEvent(channel, 'open')
          .pipe(
            tap(() => {
              console.log(`data channel ${channel.label} opened`);
            }),
            take(1)
          );
        const channelClose$ = fromEvent(channel, 'close')
          .pipe(
            tap(() => {
              console.log(`data channel ${channel.label} closed`);
            }),
            take(1)
          );
        return fromEvent<MessageEvent<string>>(channel, 'message')
          .pipe(
            skipUntil(channelOpen$),
            takeUntil(channelClose$),
            map((messageEvent): Action => JSON.parse(messageEvent.data))
          );
      }),
      tap((action) => {
        this.store.dispatch(action);
      })
    );

  private dispatchToHostSubject: Subject<Action> = new Subject();
  private dispatchToHost$ = this.store.select(selectGuestChannel)
    .pipe(
      filter((channel): channel is RTCDataChannel => Boolean(channel)),
      switchMap((channel) => this.dispatchToHostSubject
        .pipe(
          map((action) => JSON.stringify(action)),
          tap((actionJson) => {
            channel.send(actionJson);
          })
        )
      )
    );

  private dispatchFromHost$ = this.store.select(selectGuestChannel)
    .pipe(
      filter((channel): channel is RTCDataChannel => Boolean(channel)),
      switchMap((channel) => {
        const channelOpen$ = fromEvent(channel, 'open')
          .pipe(
            tap(() => {
              console.log(`data channel ${channel.label} opened`);
            }),
            take(1)
          );
        const channelClose$ = fromEvent(channel, 'close')
          .pipe(
            tap(() => {
              console.log(`data channel ${channel.label} closed`);
            }),
            take(1)
          );

        return fromEvent<MessageEvent<string>>(channel, 'message')
          .pipe(
            skipUntil(channelOpen$),
            takeUntil(channelClose$),
            map((messageEvent): Action => JSON.parse(messageEvent.data))
          );
      }),
      tap((hostAction) => {
        this.store.dispatch(hostAction);
      })
    );

  private subscription = merge(
    this.captureRole$,
    this.dispatchFromGuest$,
    this.dispatchToHost$,
    this.dispatchFromHost$
  )
    .subscribe();

  constructor(private store: Store<AppState>) { }

  initialize() { }
  
  dispatch(action: Action): void {
    if (this.role !== 'guest') {
      this.store.dispatch(action);
    }
    else {
      this.dispatchToHostSubject.next(action);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
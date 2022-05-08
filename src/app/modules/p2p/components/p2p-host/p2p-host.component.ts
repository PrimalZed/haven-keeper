import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, merge } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { selectHostGuestConnections, selectHostGuests } from 'store/p2p/p2p.selectors';

@Component({
  selector: 'p2p-host',
  templateUrl: './p2p-host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P2pHostComponent {
  guests$ = this.store.select(selectHostGuestConnections)
    .pipe(
      switchMap((connections) => merge(
        ...connections
        .map((connection) => fromEvent(connection.connection, 'connectionstatechange'))
      )),
      map(() => void(0)),
      tap(() => {
        selectHostGuests.release();
      }),
      startWith(void(0)),
      switchMap(() => this.store.select(selectHostGuests))
    );

  constructor(private store: Store<AppState>) { }
}

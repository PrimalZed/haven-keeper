import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromEvent, merge } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { receiveGuestAnswer, startGuestConnection } from 'store/p2p/p2p.actions';
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
        .map((connection) => fromEvent(connection.connection, 'signalingstatechange'))
      )),
      map(() => void(0)),
      tap(() => {
        selectHostGuests.release();
      }),
      startWith(void(0)),
      switchMap(() => this.store.select(selectHostGuests))
    );

  constructor(private store: Store<AppState>) { }

  addGuest() {
    this.store.dispatch(startGuestConnection());
  }

  receiveGuestAnswer(index: number, form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.store.dispatch(receiveGuestAnswer({ index, answer: form.value.answer }));
  }
}

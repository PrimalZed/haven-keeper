import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'store/app.state';
import { leave, startGuestConnection } from 'store/p2p/p2p.actions';
import { selectP2pRole } from 'store/p2p/p2p.selectors';

@Component({
  selector: 'p2p-bottom',
  templateUrl: './p2p-bottom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P2pBottomComponent {
  public role$ = this.store.select(selectP2pRole);

  constructor(private store: Store<AppState>) { }

  addGuest() {
    this.store.dispatch(startGuestConnection());
  }

  leave() {
    this.store.dispatch(leave());
  }
}

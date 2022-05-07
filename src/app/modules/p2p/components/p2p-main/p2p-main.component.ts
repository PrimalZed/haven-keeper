import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'store/app.state';
import { chooseRole } from 'store/p2p/p2p.actions';
import { selectP2pRole } from 'store/p2p/p2p.selectors';

@Component({
  selector: 'p2p-main',
  templateUrl: './p2p-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P2pMainComponent {
  public role$ = this.store.select(selectP2pRole);

  constructor(private store: Store<AppState>) { }

  chooseRole(role: 'host' | 'guest') {
    this.store.dispatch(chooseRole({ role }));
  }
}

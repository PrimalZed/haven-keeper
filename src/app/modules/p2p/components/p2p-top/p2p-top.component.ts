import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'store/app.state';
import { selectP2pRole } from 'store/p2p/p2p.selectors';

@Component({
  selector: 'p2p-top',
  templateUrl: './p2p-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P2pTopComponent {
  role$ = this.store.select(selectP2pRole);
  
  constructor(private store: Store<AppState>) { }
}

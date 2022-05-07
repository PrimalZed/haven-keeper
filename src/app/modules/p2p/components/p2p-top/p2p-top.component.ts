import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'store/app.state';
import { selectP2pRole } from 'store/p2p/p2p.selectors';
import { P2pHelpComponent } from '../p2p-help/p2p-help.component';

@Component({
  selector: 'p2p-top',
  templateUrl: './p2p-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P2pTopComponent {
  role$ = this.store.select(selectP2pRole);
  
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  openHelpDialog() {
    this.dialog.open(P2pHelpComponent);
  }
}

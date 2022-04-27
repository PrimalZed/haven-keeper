import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddCardDialogComponent } from 'components/add-card-dialog/add-card-dialog.component';
import { AppState } from 'store/app.state';
import { drawMonsterAbilityCards } from 'store/tabletop/tabletop.actions';

@Component({
  templateUrl: './tabletop-bottom.component.html',
  styleUrls: ['./tabletop-bottom.component.scss']
})
export class TabletopBottomComponent {

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  openAddCardDialog() {
    this.dialog.open(AddCardDialogComponent);
  }

  drawMonsterAbilityCards() {
    this.store.dispatch(drawMonsterAbilityCards());
  }
}

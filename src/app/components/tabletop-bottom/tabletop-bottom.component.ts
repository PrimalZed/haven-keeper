import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AddCardDialogComponent } from 'components/add-card-dialog/add-card-dialog.component';
import { AppState } from 'store/app.state';
import { drawMonsterAbilityCards } from 'store/tabletop/monsters/monsters.actions';
import { nextRound } from 'store/tabletop/tabletop.actions';
import { selectTabletopStep } from 'store/tabletop/tabletop.selectors';

@Component({
  templateUrl: './tabletop-bottom.component.html',
  styleUrls: ['./tabletop-bottom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabletopBottomComponent {
  private step$ = this.store.select(selectTabletopStep);
  cardSelectionActive$ = this.step$
    .pipe(
      map((step) => step === 'card-selection')
    );
  actionsActive$ = this.step$
    .pipe(
      map((step) => step === 'actions')
    );

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

  nextRound() {
    this.store.dispatch(nextRound());
  }
}

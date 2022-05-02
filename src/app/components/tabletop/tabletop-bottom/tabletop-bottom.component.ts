import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AddCardDialogComponent } from 'components/tabletop/add-card-dialog/add-card-dialog.component';
import { CharacterInitiativeDialogComponent } from 'components/tabletop/character-initiative-dialog/character-initiative-dialog.component';
import { AppState } from 'store/app.state';
import { drawMonsterAbilityCards } from 'store/tabletop/monsters/monsters.actions';
import { nextRound } from 'store/tabletop/tabletop.actions';
import { selectTabletopStep } from 'store/tabletop/tabletop.selectors';
import { selectCharacterKeys } from 'store/tabletop/characters/characters.selectors';

@Component({
  selector: 'tabletop-bottom',
  templateUrl: './tabletop-bottom.component.html',
  styleUrls: ['./tabletop-bottom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabletopBottomComponent implements OnDestroy {
  private step$ = this.store.select(selectTabletopStep);
  cardSelectionActive$ = this.step$
    .pipe(
      map((step) => step === 'card-selection')
    );
  actionsActive$ = this.step$
    .pipe(
      map((step) => step === 'actions')
    );

  private finishCardSelectionSubject: Subject<void> = new Subject();
  private finishCardSelection$ = this.finishCardSelectionSubject
    .pipe(
      withLatestFrom(this.store.select(selectCharacterKeys)),
      switchMap(([_, characterKeys]) => characterKeys.length
        ? this.dialog.open<CharacterInitiativeDialogComponent, any, { [key: string]: number }>(CharacterInitiativeDialogComponent)
          .afterClosed()
          .pipe(
            filter((characterInitiatives): characterInitiatives is { [key: string]: number } => Boolean(characterInitiatives))
          )
        : of<{ [key: string]: number }>({ })
      ),
      tap((characterInitiatives) => {
        this.store.dispatch(drawMonsterAbilityCards({ characterInitiatives }));
      })
    );

  private subscription = this.finishCardSelection$.subscribe();

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  openAddCardDialog() {
    this.dialog.open(AddCardDialogComponent);
  }

  finishCardSelection() {
    this.finishCardSelectionSubject.next();
  }

  nextRound() {
    this.store.dispatch(nextRound());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

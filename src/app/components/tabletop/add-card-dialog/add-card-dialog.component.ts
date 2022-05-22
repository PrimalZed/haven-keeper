import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CatalogService } from 'services/catalog.service';
import { TabletopService } from 'services/tabletop.service';
import { AppState } from 'store/app.state';
import { addCharacter } from 'store/tabletop/characters/characters.actions';
import { selectCharacterKeys } from 'store/tabletop/characters/characters.selectors';
import { addMonster } from 'store/tabletop/monsters/monsters.actions';
import { selectMonsterKeys } from 'store/tabletop/monsters/monsters.selectors';
import { selectScenarioLevel } from 'store/tabletop/tabletop.selectors';
import { SetScenarioLevelComponent } from '../set-scenario-level/set-scenario-level.component';

@Component({
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCardDialogComponent implements OnDestroy {
  public characters$ = this.store.select(selectCharacterKeys)
    .pipe(
      map((characterKeys) => this.catalogService.characters
        .map(({ key }) => ({
          key,
          used: characterKeys.includes(key)
        }))
      )
    );

  public monsters$ = this.store.select(selectMonsterKeys)
    .pipe(
      map((monsterKeys) => this.catalogService.monsters
        .map(({ key, name }) => ({
          key,
          name,
          used: monsterKeys.includes(key)
        }))
      )
    );

  private addMonsterSubject: Subject<string> = new Subject();
  private addMonster$ = this.addMonsterSubject
    .pipe(
      withLatestFrom(this.store.select(selectScenarioLevel)),
      switchMap(([key, scenarioLevel]) => scenarioLevel === null
        ? this.dialog.open<SetScenarioLevelComponent, any, { success: boolean }>(SetScenarioLevelComponent)
          .afterClosed()
          .pipe(
            filter((result) => Boolean(result?.success)),
            map(() => key)
          )
        : of(key)
      ),
      tap((key) => {
        this.tabletopService.dispatch(addMonster({ key }));
        this.dialogRef.close();
      })
    );

  private subscription: Subscription = this.addMonster$.subscribe();

  constructor(
    private catalogService: CatalogService,
    private dialogRef: MatDialogRef<AddCardDialogComponent>,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private tabletopService: TabletopService
  ) { }

  addCharacter(key: string) {
    this.tabletopService.dispatch(addCharacter({ key, level: 1 }));
    this.dialogRef.close();
  }

  addMonster(key: string) {
    this.addMonsterSubject.next(key);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

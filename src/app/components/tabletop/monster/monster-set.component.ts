import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MonsterSet } from 'models/monster-set';
import { getAbilityDeckKey, MonsterStatCard } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';
import { AddStandeeDialogComponent } from './add-standee-dialog/add-standee-dialog.component';
import { MonsterAbilityDeck } from 'models/monster-ability-deck';
import { selectMonsterAbilityDeckEntities } from 'store/tabletop/monster-ability-decks/monster-ability-decks.selectors';
import { selectMonsterEntities } from 'store/tabletop/monsters/monsters.selectors';
import { AppState } from 'store/app.state';

@Component({
  selector: 'monster-set',
  templateUrl: './monster-set.component.html',
  styleUrls: ['./monster-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterSetComponent implements OnDestroy {
  private monsterKeySubject: Subject<string> = new ReplaySubject(1);
  public monster$: Observable<MonsterSet> = this.monsterKeySubject
    .pipe(
      switchMap((monsterKey) => this.store.select(selectMonsterEntities)
        .pipe(map((monsterEntities) => monsterEntities[monsterKey]))
      ),
      filter((monster): monster is MonsterSet => Boolean(monster)),
    );
  @Input() public set monsterKey(value: string) {
    this.monsterKeySubject.next(value);
  }
  public statCard$: Observable<MonsterStatCard> = this.monster$
    .pipe(
      map(({ key }) => this.catalogService.monsterEntities[key])
    );

  public abilityDeck$: Observable<MonsterAbilityDeck> = this.statCard$
    .pipe(
      map(getAbilityDeckKey),
      switchMap((abilityDeckKey) => this.store.select(selectMonsterAbilityDeckEntities)
        .pipe(map(abilityDeckEntities => abilityDeckEntities[abilityDeckKey]))
      ),
      filter((abilityDeck): abilityDeck is MonsterAbilityDeck => Boolean(abilityDeck))
    );

  public initiative$ = this.abilityDeck$
    .pipe(
      map(({ currentAbilityCardId }) => currentAbilityCardId
        ? this.catalogService.monsterAbilityCardEntities[currentAbilityCardId].initiative
        : null
      )
    );

  public abilityCardsRemaining$ = this.abilityDeck$
    .pipe(
      map(({ key, drawnAbilityCardIds }) => this.catalogService.monsterAbilityDecks[key].length - drawnAbilityCardIds.length)
    );

  private openStandeeDialogSubject: Subject<void> = new Subject();
  private openStandeeDialog$ = this.openStandeeDialogSubject
    .pipe(
      withLatestFrom(this.monster$, (_, monster) => monster),
      map(({ key }) => this.dialog.open(AddStandeeDialogComponent, { data: { key } }))
    );

  private subscription = this.openStandeeDialog$.subscribe();

  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  openStandeeDialog() {
    this.openStandeeDialogSubject.next();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

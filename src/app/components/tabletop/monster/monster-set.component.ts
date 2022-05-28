import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FigureDialogComponent } from 'components/tabletop/figure-dialog/figure-dialog.component';
import { MonsterSet, MonsterStandee } from 'models/monster-set';
import { getAbilityDeckKey, MonsterStatCard } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';
import { AddStandeeDialogComponent } from './add-standee-dialog/add-standee-dialog.component';
import { MonsterAbilityDeck } from 'models/monster-ability-deck';
import { getMaxHitPoints } from 'pipes/max-hit-points.pipe';
import { selectMonsterAbilityDeckEntities } from 'store/tabletop/monster-ability-decks/monster-ability-decks.selectors';
import { selectMonsterEntities } from 'store/tabletop/monsters/monsters.selectors';
import { selectScenarioLevel, selectTabletopStep } from 'store/tabletop/tabletop.selectors';
import { AppState } from 'store/app.state';
import { MonsterAbilityDeckDialogComponent } from './monster-ability-deck-dialog/monster-ability-deck-dialog.component';
import { drawMonsterAbilityCard } from 'store/tabletop/monster-ability-decks/monster-ability-decks.actions';
import { TabletopService } from 'services/tabletop.service';
import { selectCharacterKeys } from 'store/tabletop/characters/characters.selectors';

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
      filter((monster): monster is MonsterSet => Boolean(monster))
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

  public standees$ = this.monster$
    .pipe(
      map(({ standees }) => [...standees]
        .sort((a, b) => (a.id - this.getRankFactor(a.rank)) - (b.id - this.getRankFactor(b.rank)))
      )
    );

  public drawCardEligible$ = combineLatest([
    this.abilityDeck$,
    this.monster$,
    this.store.select(selectTabletopStep)
  ])
    .pipe(
      map(([abilityDeck, monster, tabletopStep]) =>
        !abilityDeck.currentAbilityCardId
        && Boolean(monster.standees.length)
        && tabletopStep === 'actions'
      )
    );

  public scenarioLevel$ = this.store.select(selectScenarioLevel);

  private openAddStandeeDialogSubject: Subject<void> = new Subject();
  private openAddStandeeDialog$ = this.openAddStandeeDialogSubject
    .pipe(
      withLatestFrom(this.monster$, (_, monster) => monster),
      map(({ key }) => this.dialog.open(AddStandeeDialogComponent, { data: { key } }))
    );

  private openUpdateFigureDialogSubject: Subject<MonsterStandee> = new Subject();
  private openUpdateFigureDialog$ = this.openUpdateFigureDialogSubject
    .pipe(
      withLatestFrom(this.monster$, this.scenarioLevel$, this.store.select(selectCharacterKeys)),
      map(([standee, monster, scenarioLevel, characterKeys]) => this.dialog.open(
        FigureDialogComponent,
        {
          data: {
            maxHitPoints: getMaxHitPoints(this.catalogService.monsterEntities[monster.key], scenarioLevel ?? 0, standee.rank)
              * (standee.rank === 'boss' ? characterKeys.length : 1),
            kind: 'monster',
            statCard: this.catalogService.monsterEntities[monster.key],
            figure: standee
          }
        }
      ))
    )

  private subscription = merge(this.openAddStandeeDialog$, this.openUpdateFigureDialog$)
    .subscribe();

  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private tabletopService: TabletopService
  ) { }

  private getRankFactor(rank: 'normal' | 'elite' | 'boss') {
    switch (rank) {
      case 'boss':
        return 20;
      case 'elite':
        return 10;
      case 'normal':
        return 0;
    }
  }

  openAddStandeeDialog() {
    this.openAddStandeeDialogSubject.next();
  }

  openUpdateFigureDialog(standee: MonsterStandee) {
    this.openUpdateFigureDialogSubject.next(standee);
  }

  drawAbilityCard(key: string) {
    this.tabletopService.dispatch(drawMonsterAbilityCard({ key }))
  }

  viewDrawnAbilityCards(abilityDeck: MonsterAbilityDeck) {
    this.dialog.open(MonsterAbilityDeckDialogComponent, { data: { abilityDeck } });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

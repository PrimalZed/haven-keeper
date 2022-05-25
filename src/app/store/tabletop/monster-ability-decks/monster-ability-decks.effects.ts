import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MonsterAbilityDeck } from 'models/monster-ability-deck';
import { getAbilityDeckKey } from 'models/monster-stat-card';
import { map, withLatestFrom } from 'rxjs/operators';
import { CatalogService } from 'services/catalog.service';
import { AppState } from 'store/app.state';
import { selectMonsters } from '../monsters/monsters.selectors';
import { drawMonsterAbilityCard, drawMonsterAbilityCards, drawMonsterAbilityCardsSuccess, drawMonsterAbilityCardSuccess } from './monster-ability-decks.actions';
import { selectMonsterAbilityDeckEntities } from './monster-ability-decks.selectors';

@Injectable()
export class MonsterAbilityDecksEffects {
  drawMonsterAbilities$ = createEffect(() => this.actions$
    .pipe(
      ofType(drawMonsterAbilityCards),
      withLatestFrom(this.store.select(selectMonsters), this.store.select(selectMonsterAbilityDeckEntities)),
      map(([{ characterInitiatives }, monsters, monsterAbilityDecks]) => ({
        characterInitiatives,
        abilityCardIds: monsters
          .filter((monster) => Boolean(monster.standees.length))
          .map((monster) => getAbilityDeckKey(this.catalogService.monsterEntities[monster.key]))
          .filter((deckKey, index, arr) => index === arr.indexOf(deckKey))
          .map((deckKey) => monsterAbilityDecks[deckKey])
          .filter((monsterAbilityDeck): monsterAbilityDeck is MonsterAbilityDeck => Boolean(monsterAbilityDeck))
          .map(({ key, drawnAbilityCardIds }) => ({
            key,
            id: this.getRandom(
              this.catalogService.monsterAbilityDecks[key]
                .map((card) => card.id)
                .filter((id) => !drawnAbilityCardIds.includes(id))
            )
          }))
          .reduce(
            (acc, { key, id }): { [key: string]: number } => ({
              ...acc,
              [key]: id
            }),
            { }
          )
      })),
      map(({ characterInitiatives, abilityCardIds }) => drawMonsterAbilityCardsSuccess({ characterInitiatives, abilityCardIds }))
    )
  );

  drawMonsterAbility$ = createEffect(() => this.actions$
    .pipe(
      ofType(drawMonsterAbilityCard),
      withLatestFrom(this.store.select(selectMonsterAbilityDeckEntities)),
      map(([{ key }, monsterAbilityDecks]) => ({
        key,
        drawnAbilityCardIds: monsterAbilityDecks[key]?.drawnAbilityCardIds ?? []
      })),
      map(({ key, drawnAbilityCardIds }) => drawMonsterAbilityCardSuccess({
        key,
        cardId: this.getRandom(
          this.catalogService.monsterAbilityDecks[key]
            .map((card) => card.id)
            .filter((id) => !drawnAbilityCardIds.includes(id))
          )
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private catalogService: CatalogService,
    private store: Store<AppState>
  ) { }

  private getRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { CatalogService } from 'services/catalog.service';
import { AppState } from 'store/app.state';
import { drawMonsterAbilityCards, drawMonsterAbilityCardsSuccess } from './monster-ability-decks.actions';
import { selectMonsterAbilityDecks } from './monster-ability-decks.selectors';

@Injectable()
export class MonsterAbilityDecksEffects {
  drawMonsterAbilities$ = createEffect(() => this.actions$
    .pipe(
      ofType(drawMonsterAbilityCards),
      withLatestFrom(this.store.select(selectMonsterAbilityDecks)),
      map(([{ characterInitiatives }, monsterAbilityDecks]) => ({
        characterInitiatives,
        abilityCardIds: monsterAbilityDecks
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

  constructor(
    private actions$: Actions,
    private catalogService: CatalogService,
    private store: Store<AppState>
  ) { }

  private getRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

import { createSelector } from '@ngrx/store';
import { selectTabletopState } from '../tabletop.selectors';
import { monsterAbilityDecksAdapter } from './monster-ability-decks.adapter';

export const selectMonsterAbilityDecksState = createSelector(
  selectTabletopState,
  (state) => state.monsterAbilityDecks
);

export const {
  selectIds: selectMonsterAbilityDeckKeysBase,
  selectEntities: selectMonsterAbilityDeckEntities,
  selectAll: selectMonsterAbilityDecks
} = monsterAbilityDecksAdapter.getSelectors(selectMonsterAbilityDecksState);

export const selectMonsterAbilityDeckKeys = createSelector(
  selectMonsterAbilityDeckKeysBase,
  (monsterKeys) => monsterKeys as string[]
);

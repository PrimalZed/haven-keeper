import { createSelector } from '@ngrx/store';
import { Card } from 'models/card';
import { selectTabletopState } from '../tabletop.selectors';
import { monstersAdapter } from './monsters.adapter';

export const selectMonstersState = createSelector(
  selectTabletopState,
  (state) => state.monsters
);

export const {
  selectIds: selectMonsterKeysBase,
  selectEntities: selectMonsterEntities,
  selectAll: selectMonsters
} = monstersAdapter.getSelectors(selectMonstersState);

export const selectMonsterKeys = createSelector(
  selectMonsterKeysBase,
  (monsterKeys) => monsterKeys as string[]
);

import { createSelector } from '@ngrx/store';
import { MonsterSet } from 'models/monster-set';
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

export const selectCards = createSelector(
  selectMonsters,
  (monsters) => monsters.map((x): (MonsterSet & { kind: 'monster' }) => ({ kind: 'monster', ...x }))
);

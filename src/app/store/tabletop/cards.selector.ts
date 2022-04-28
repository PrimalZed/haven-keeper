import { createSelector } from '@ngrx/store';
import { Card } from 'models/card';
import { selectCharacters } from './characters/characters.selectors';
import { selectMonsters } from './monsters/monsters.selectors';

export const selectCards = createSelector(
  selectCharacters,
  selectMonsters,
  (characters, monsters) => [
    ...characters.map((x): Card => ({ kind: 'character', ...x })),
    ...monsters.map((x): Card => ({ kind: 'monster', ...x }))
  ]
);

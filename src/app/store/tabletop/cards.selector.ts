import { createSelector } from '@ngrx/store';
import { Card } from 'models/card';
import { selectCharacters } from './characters/characters.selectors';
import { selectMonsterAbilityDeckEntities } from './monster-ability-decks/monster-ability-decks.selectors';
import { selectMonsters } from './monsters/monsters.selectors';

export const selectCards = createSelector(
  selectCharacters,
  selectMonsters,
  selectMonsterAbilityDeckEntities,
  (characters, monsters, monsterAbilityDecks) => ({
    cards: [
      ...characters.map((x): Card => ({ kind: 'character', ...x })),
      ...monsters.map((x): Card => ({ kind: 'monster', ...x }))
    ],
    monsterAbilityDecks
  })
);

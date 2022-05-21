import { on } from '@ngrx/store';
import { charactersAdapter } from '../characters/characters.adapter';
import { TabletopState } from '../tabletop.state';
import { drawMonsterAbilityCardsSuccess, undoDrawMonsterAbilityCards } from './monster-ability-decks.actions';
import { monsterAbilityDecksAdapter } from './monster-ability-decks.adapter';

export function getMonsterAbilityDecksOns() {
  return [
    on<TabletopState, [typeof drawMonsterAbilityCardsSuccess]>(drawMonsterAbilityCardsSuccess, (state, { characterInitiatives, abilityCardIds }) => ({
      ...state,
      step: 'actions',
      characters: charactersAdapter.map((character) => ({
        ...character,
        initiative: characterInitiatives[character.key]
      }), state.characters),
      monsterAbilityDecks: monsterAbilityDecksAdapter.map((monsterAbilityDeck) => ({
        ...monsterAbilityDeck,
        currentAbilityCardId: abilityCardIds[monsterAbilityDeck.key],
        drawnAbilityCardIds: [
          ...monsterAbilityDeck.drawnAbilityCardIds,
          abilityCardIds[monsterAbilityDeck.key]
        ]
      }), state.monsterAbilityDecks)
    })),
    on<TabletopState, [typeof undoDrawMonsterAbilityCards]>(undoDrawMonsterAbilityCards, (state, { abilityCardIds }) => ({
      ...state,
      step: 'card-selection',
      monsterAbilityDecks: monsterAbilityDecksAdapter.map((monsterAbilityDeck) => ({
        ...monsterAbilityDeck,
        currentAbilityCardId: abilityCardIds[monsterAbilityDeck.key].previousId,
        drawnAbilityCardIds: monsterAbilityDeck.drawnAbilityCardIds
          .filter((id) => id !== abilityCardIds[monsterAbilityDeck.key].nextId)
      }), state.monsterAbilityDecks)
    }))
  ];
}

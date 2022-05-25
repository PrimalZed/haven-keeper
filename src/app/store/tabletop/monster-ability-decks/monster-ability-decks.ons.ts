import { on } from '@ngrx/store';
import { charactersAdapter } from '../characters/characters.adapter';
import { TabletopState } from '../tabletop.state';
import { drawMonsterAbilityCardsSuccess, drawMonsterAbilityCardSuccess, undoDrawMonsterAbilityCard, undoDrawMonsterAbilityCards } from './monster-ability-decks.actions';
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
        currentAbilityCardId: abilityCardIds[monsterAbilityDeck.key] ?? monsterAbilityDeck.currentAbilityCardId,
        drawnAbilityCardIds: abilityCardIds[monsterAbilityDeck.key]
          ? [
            ...monsterAbilityDeck.drawnAbilityCardIds,
            abilityCardIds[monsterAbilityDeck.key]
          ]
          : monsterAbilityDeck.drawnAbilityCardIds
      }), state.monsterAbilityDecks)
    })),
    on<TabletopState, [typeof undoDrawMonsterAbilityCards]>(undoDrawMonsterAbilityCards, (state, { abilityCardIds }) => ({
      ...state,
      step: 'card-selection',
      monsterAbilityDecks: monsterAbilityDecksAdapter.map((monsterAbilityDeck) => ({
        ...monsterAbilityDeck,
        currentAbilityCardId: abilityCardIds[monsterAbilityDeck.key]
          ? abilityCardIds[monsterAbilityDeck.key].previousId
          : monsterAbilityDeck.currentAbilityCardId,
        drawnAbilityCardIds: abilityCardIds[monsterAbilityDeck.key]
          ? monsterAbilityDeck.drawnAbilityCardIds
            .filter((id) => id !== abilityCardIds[monsterAbilityDeck.key].nextId)
          : monsterAbilityDeck.drawnAbilityCardIds
      }), state.monsterAbilityDecks)
    })),
    on<TabletopState, [typeof drawMonsterAbilityCardSuccess]>(drawMonsterAbilityCardSuccess, (state, { key, cardId }) => ({
      ...state,
      monsterAbilityDecks: monsterAbilityDecksAdapter.mapOne(
        {
          id: key,
          map: (monsterAbilityDeck) => ({
            ...monsterAbilityDeck,
            currentAbilityCardId: cardId,
            drawnAbilityCardIds: [
              ...monsterAbilityDeck.drawnAbilityCardIds,
              cardId
            ]
          })
        },
        state.monsterAbilityDecks
      )
    })),
    on<TabletopState, [typeof undoDrawMonsterAbilityCard]>(undoDrawMonsterAbilityCard, (state, { key, cardId }) => ({
      ...state,
      monsterAbilityDecks: monsterAbilityDecksAdapter.mapOne(
        {
          id: key,
          map: (monsterAbilityDeck) => ({
            ...monsterAbilityDeck,
            currentAbilityCardId: null,
            drawnAbilityCardIds: monsterAbilityDeck.drawnAbilityCardIds
              .filter((id) => id !== cardId)
          })
        },
        state.monsterAbilityDecks
      )
    }))
  ];
}

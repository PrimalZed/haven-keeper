import { createReducer, on } from '@ngrx/store';
import { ElementalInfusion } from 'models/element';
import { CatalogService } from 'services/catalog.service';
import { charactersAdapter } from './characters/characters.adapter';
import { getCharactersOns } from './characters/characters.ons';
import { monsterAbilityDecksAdapter } from './monster-ability-decks/monster-ability-decks.adapter';
import { getMonsterAbilityDecksOns } from './monster-ability-decks/monster-ability-decks.ons';
import { monstersAdapter } from './monsters/monsters.adapter';
import { getMonstersOns } from './monsters/monsters.ons';
import {
  clearTabletop,
  infuseElement, 
  loadTabletop, 
  nextRound, 
  setScenarioLevel, 
  undoClearTabletop, 
  undoInfuseElement,
  undoNextRound,
  undoSetScenarioLevel
} from './tabletop.actions';
import { TabletopState } from './tabletop.state';

export const initialTabletopState: TabletopState = {
  step: 'card-selection',
  round: 1,
  level: null,
  elementalInfusion: {
    'fire': 'inert',
    'ice': 'inert',
    'air': 'inert',
    'earth': 'inert',
    'light': 'inert',
    'dark': 'inert'
  },
  characters: charactersAdapter.getInitialState(),
  monsters: monstersAdapter.getInitialState(),
  monsterAbilityDecks: monsterAbilityDecksAdapter.getInitialState()
};

export function getTabletopReducer(catalogService: CatalogService) {
  return createReducer<TabletopState>(
    initialTabletopState,
    ...getCharactersOns(catalogService),
    ...getMonstersOns(catalogService),
    ...getMonsterAbilityDecksOns(),
    on(loadTabletop, (oldState, { state: newState }) => newState),
    on(clearTabletop, (state) => ({ ...initialTabletopState })),
    on(undoClearTabletop, (state, { oldState }) => ({ ...oldState })),
    on(infuseElement, (state, { element }) => ({
      ...state,
      elementalInfusion: {
        ...state.elementalInfusion,
        [element]: ((startingInfusion: ElementalInfusion): ElementalInfusion => {
          switch (startingInfusion) {
            case 'strong':
              return 'waning';
            case 'waning':
              return 'inert';
            case 'inert':
              return 'strong';
          }
        })(state.elementalInfusion[element])
      }
    })),
    on(undoInfuseElement, (state, { element }) => ({
      ...state,
      elementalInfusion: {
        ...state.elementalInfusion,
        [element]: ((startingInfusion: ElementalInfusion): ElementalInfusion => {
          switch (startingInfusion) {
            case 'strong':
              return 'inert';
            case 'waning':
              return 'strong';
            case 'inert':
              return 'waning';
          }
        })(state.elementalInfusion[element])
      }
    })),
    on(setScenarioLevel, (state, { level }) => ({
      ...state,
      level
    })),
    on(undoSetScenarioLevel, (state, { previousLevel }) => ({
      ...state,
      level: previousLevel
    })),
    on(nextRound, (state) => ({
      ...state,
      step: 'card-selection',
      round: state.round + 1,
      elementalInfusion: {
        'fire': state.elementalInfusion['fire'] === 'strong' ? 'waning' : 'inert',
        'ice': state.elementalInfusion['ice'] === 'strong' ? 'waning' : 'inert',
        'air': state.elementalInfusion['air'] === 'strong' ? 'waning' : 'inert',
        'earth': state.elementalInfusion['earth'] === 'strong' ? 'waning' : 'inert',
        'light': state.elementalInfusion['light'] === 'strong' ? 'waning' : 'inert',
        'dark': state.elementalInfusion['dark'] === 'strong' ? 'waning' : 'inert'
      },
      characters: charactersAdapter.map((character) => ({
        ...character,
        initiative: null
      }), state.characters),
      monsterAbilityDecks: monsterAbilityDecksAdapter.map((monsterAbilityDeck) => ({
        ...monsterAbilityDeck,
        currentAbilityCardId: null,
        drawnAbilityCardIds: monsterAbilityDeck.drawnAbilityCardIds.length >= catalogService.monsterAbilityDecks[monsterAbilityDeck.key].length
          || catalogService.monsterAbilityDecks[monsterAbilityDeck.key].find(x => x.id === monsterAbilityDeck.currentAbilityCardId)?.shuffle
          ? []
          : monsterAbilityDeck.drawnAbilityCardIds
      }), state.monsterAbilityDecks)
    })),
    on(undoNextRound, (state, { elementalInfusion, characterInitiatives, abilityCardIds, drawnAbilityCardIds }) => ({
      ...state,
      step: 'actions',
      round: state.round - 1,
      elementalInfusion: { ...elementalInfusion },
      characters: charactersAdapter.map((character) => ({
        ...character,
        initiative: characterInitiatives[character.key]
      }), state.characters),
      monsters: monstersAdapter.map((monster) => ({
        ...monster,
        currentAbilityCardId: abilityCardIds[monster.key],
        drawnAbilityCardIds: drawnAbilityCardIds[monster.key]
      }), state.monsters)
    }))
  );
}

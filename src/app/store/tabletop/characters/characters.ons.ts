import { on } from '@ngrx/store';
import { CatalogService } from 'services/catalog.service';
import { TabletopState } from '../tabletop.state';
import { addCharacter, addCharacterSummon, undoAddCharacter, undoAddCharacterSummon, undoUpdateCharacter, updateCharacter } from './characters.actions';
import { charactersAdapter } from './characters.adapter';

export function getCharactersOns(catalogService: CatalogService) {
  return [
    on<TabletopState, [typeof addCharacter]>(addCharacter, (state, { key, level }) => ({
      ...state,
      characters: charactersAdapter.addOne({
        key,
        level,
        figures: new Array(catalogService.characterEntities[key].hitPoints.length)
          .fill(void(0))
          .map((_, index) => ({
            hitPoints: catalogService.characterEntities[key].hitPoints[index][level],
            conditions: []
          })),
        summons: [],
        initiative: null
      }, state.characters)
    })),
    on<TabletopState, [typeof undoAddCharacter]>(undoAddCharacter, (state, { key }) => ({
      ...state,
      characters: charactersAdapter.removeOne(key, state.characters)
    })),
    on<TabletopState, [typeof updateCharacter]>(updateCharacter, (state, { key, index, hitPoints, conditions }) => ({
      ...state,
      characters: charactersAdapter.mapOne(
        {
          id: key,
          map: (character) => ({
            ...character,
            figures: character.figures
              .map((figure, figureIndex) => figureIndex === index
                ? ({
                  hitPoints,
                  conditions
                })
                : figure
              )
          })
        },
        state.characters
      )
    })),
    on<TabletopState, [typeof undoUpdateCharacter]>(undoUpdateCharacter, (state, { key, index, previousHitPoints, previousConditions }) => ({
      ...state,
      characters: charactersAdapter.mapOne(
        {
          id: key,
          map: (character) => ({
            ...character,
            figures: character.figures
              .map((figure, figureIndex) => figureIndex === index
                ? ({
                  hitPoints: previousHitPoints,
                  conditions: previousConditions
                })
                : figure
              )
          })
        },
        state.characters
      )
    })),
    on<TabletopState, [typeof addCharacterSummon]>(addCharacterSummon, (state, { key, color, hitPoints, movement, attack, range }) => ({
      ...state,
      characters: charactersAdapter.mapOne(
        {
          id: key,
          map: (character) => ({
            ...character,
            summons: [
              ...character.summons,
              {
                color,
                hitPoints,
                movement: movement ?? 0,
                attack: attack ?? 0,
                range: range ?? 0,
                conditions: []
              }
            ]
          })
        },
        state.characters
      )
    })),
    on<TabletopState, [typeof undoAddCharacterSummon]>(undoAddCharacterSummon, (state, { key, color }) => ({
      ...state,
      characters: charactersAdapter.mapOne(
        {
          id: key,
          map: (character) => ({
            ...character,
            summons: character.summons
              .filter((summon) => summon.color !== color)
          })
        },
        state.characters
      )
    }))
  ];
}

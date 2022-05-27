import { on } from '@ngrx/store';
import { CatalogService } from 'services/catalog.service';
import { TabletopState } from '../tabletop.state';
import { addCharacter, undoAddCharacter, undoUpdateCharacter, updateCharacter } from './characters.actions';
import { charactersAdapter } from './characters.adapter';

export function getCharactersOns(catalogService: CatalogService) {
  return [
    on<TabletopState, [typeof addCharacter]>(addCharacter, (state, { key, level }) => ({
      ...state,
      characters: charactersAdapter.addOne({
        key,
        level,
        hitPoints: catalogService.characterEntities[key].hitPoints[level],
        conditions: [],
        initiative: null
      }, state.characters)
    })),
    on<TabletopState, [typeof undoAddCharacter]>(undoAddCharacter, (state, { key }) => ({
      ...state,
      characters: charactersAdapter.removeOne(key, state.characters)
    })),
    on<TabletopState, [typeof updateCharacter]>(updateCharacter, (state, { key, hitPoints, conditions }) => ({
      ...state,
      characters: charactersAdapter.mapOne(
        {
          id: key,
          map: (character) => ({
            ...character,
            hitPoints,
            conditions
          })
        },
        state.characters
      )
    })),
    on<TabletopState, [typeof undoUpdateCharacter]>(undoUpdateCharacter, (state, { key, previousHitPoints, previousConditions }) => ({
      ...state,
      characters: charactersAdapter.mapOne(
        {
          id: key,
          map: (character) => ({
            ...character,
            hitPoints: previousHitPoints,
            conditions: previousConditions
          })
        },
        state.characters
      )
    }))
  ];
}

import { createSelector } from '@ngrx/store';
import { selectTabletopState } from '../tabletop.selectors';
import { charactersAdapter } from './characters.adapter';

export const selectCharactersState = createSelector(
  selectTabletopState,
  (state) => state.characters
);

export const {
  selectIds: selectCharacterKeysBase,
  selectEntities: selectCharacterEntities,
  selectAll: selectCharacters
} = charactersAdapter.getSelectors(selectCharactersState);

export const selectCharacterKeys = createSelector(
  selectCharacterKeysBase,
  (characterKeys) => characterKeys as string[]
);

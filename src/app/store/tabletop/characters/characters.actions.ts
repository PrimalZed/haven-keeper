import { createAction, props } from '@ngrx/store';
import { CharacterLevel } from 'models/character';

export const addCharacter = createAction(
  "[Tabletop] [Characters] Add Character",
  props<{ key: string, level: CharacterLevel }>()
);

export const undoAddCharacter = createAction(
  "[Tabletop] [Characters] Undo Add Character",
  props<{ key: string }>()
);

export const CharactersActions = [
  addCharacter,
  undoAddCharacter
];

import { createAction, props } from '@ngrx/store';
import { CharacterLevel } from 'models/character';
import { ConditionKey } from 'models/condition';

export const addCharacter = createAction(
  "[Tabletop] [Characters] Add Character",
  props<{ key: string, level: CharacterLevel }>()
);

export const undoAddCharacter = createAction(
  "[Tabletop] [Characters] Undo Add Character",
  props<{ key: string }>()
);

export const updateCharacter = createAction(
  "[Tabletop] [Characters] Update Character",
  props<{ key: string, index: number, hitPoints: number, conditions: ConditionKey[] }>()
);

export const undoUpdateCharacter = createAction(
  "[Tabletop] [Characters] Undo Update Character",
  props<{ key: string, index: number, previousHitPoints: number, previousConditions: ConditionKey[] }>()
);

export const CharactersActions = [
  addCharacter,
  undoAddCharacter,
  updateCharacter,
  undoUpdateCharacter
];

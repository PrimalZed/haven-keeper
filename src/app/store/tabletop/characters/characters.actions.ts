import { createAction, props } from '@ngrx/store';
import { CharacterLevel, Summon, SummonColor } from 'models/character';
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

export const addCharacterSummon = createAction(
  "[Tabletop] [Character] Add Summon",
  props<{ key: string, color: SummonColor, hitPoints: number; movement: number; attack: number; range: number; }>()
);

export const undoAddCharacterSummon = createAction(
  "[Tabletop] [Character] Undo Add Summon",
  props<{ key: string, color: SummonColor }>()
);

export const updateCharacterSummon = createAction(
  "[Tabletop] [Character] Update Summon",
  props<{ key: string, color: SummonColor, hitPoints: number, conditions: ConditionKey[] }>()
);

export const undoUpdateCharacterSummon = createAction(
  "[Tabletop] [Character] Undo Update Summon",
  props<{ key: string, color: SummonColor, previousHitPoints: number, conditions: ConditionKey[] }>()
);

export const removeCharacterSummon = createAction(
  "[Tabletop] [Character] Remove Summon",
  props<{ key: string, color: SummonColor }>()
);

export const undoRemoveCharacterSummon = createAction(
  "[Tabletop] [Character] Undo Remove Summon",
  props<{ key: string, summon: Summon }>()
);

export const CharactersActions = [
  addCharacter,
  undoAddCharacter,
  updateCharacter,
  undoUpdateCharacter,
  addCharacterSummon,
  undoAddCharacterSummon,
  updateCharacterSummon,
  undoUpdateCharacterSummon,
  removeCharacterSummon,
  undoRemoveCharacterSummon
];

import { createAction, props } from '@ngrx/store';
import { ConditionKey } from 'models/condition';

export const addMonster = createAction(
  "[Tabletop] [Monsters] Add Monster",
  props<{ key: string }>()
);

export const undoAddMonster = createAction(
  "[Tabletop] [Monsters] Undo Add Monster",
  props<{ key: string }>()
);

export const addMonsterStandee = createAction(
  "[Tabletop] [Monsters] Add Monster Standee",
  props<{ key: string, id: number, rank: 'normal' | 'elite' }>()
);

export const undoAddMonsterStandee = createAction(
  "[Tabletop] [Monsters] Undo Add Monster Standee",
  props<{ key: string, id: number }>()
);

export const updateMonsterStandee = createAction(
  "[Tabletop] [Monsters] Update Monster Standee",
  props<{ key: string, id: number, hitPoints: number, conditions: ConditionKey[] }>()
);

export const undoUpdateMonsterStandee = createAction(
  "[Tabletop] [Monsters] Undo Update Monster Standee",
  props<{ key: string, id: number, previousHitPoints: number, previousConditions: ConditionKey[] }>()
);

export const MonstersActions = [
  addMonster,
  undoAddMonster,
  addMonsterStandee,
  undoAddMonsterStandee,
  updateMonsterStandee,
  undoUpdateMonsterStandee
];

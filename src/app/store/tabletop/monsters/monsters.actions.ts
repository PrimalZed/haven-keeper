import { createAction, props } from '@ngrx/store';

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

export const MonstersActions = [
  addMonster,
  undoAddMonster,
  addMonsterStandee,
  undoAddMonsterStandee
];

import { Action, createAction, props } from '@ngrx/store';

export const undo = createAction(
  '[Time Machine] Undo',
  props<{ length: number }>()
);

export const undoSuccess = createAction(
  '[Time Machine] Undo Success',
  props<{ undoneActions: Action[] }>()
);

export const redo = createAction(
  '[Time Machine] Redo',
  props<{ length: number }>()
);

export const redoSuccess = createAction(
  '[Time Machine] Redo Success',
  props<{ length: number, oldFuture: Action[] }>()
);

export type TimeMachineActions =
  | typeof undo
  | typeof redo;

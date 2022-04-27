import { createReducer, on } from '@ngrx/store';
import { redoSuccess, undoSuccess } from './time-machine.actions';
import { TimeMachineState } from './time-machine.state';

const initialTimeMachineState: TimeMachineState = {
  past: [],
  future: []
};

export const timeMachineReducer = createReducer<TimeMachineState>(
  initialTimeMachineState,
  on(undoSuccess, (state, { undoneActions }) => ({
    ...state,
    past: state.past
      .slice(undefined, state.past.length - undoneActions.length),
    future: [
      ...undoneActions,
      ...state.future
    ]
  })),
  on(redoSuccess, (state, { length, oldFuture }) => ({
    ...state,
    future: oldFuture
      .slice(length)
  }))
);

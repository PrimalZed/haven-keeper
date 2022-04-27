import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimeMachineState } from './time-machine.state';

export const selectTimeMachineState = createFeatureSelector<TimeMachineState>('timeMachine');

export const selectPast = createSelector(
  selectTimeMachineState,
  (state) => state.past
);

export const selectFuture = createSelector(
  selectTimeMachineState,
  (state) => state.future
);

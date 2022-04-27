import { Action } from '@ngrx/store';

export interface TimeMachineState {
  past: { originalAction: Action, reverseAction: Action }[];
  future: Action[];
}

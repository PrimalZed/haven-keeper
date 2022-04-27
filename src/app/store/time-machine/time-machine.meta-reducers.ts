import { Action, ActionReducer } from '@ngrx/store';
import { AppState } from 'store/app.state';
import { addMonster, addMonsterStandee, undoAddMonster, undoAddMonsterStandee } from 'store/tabletop/tabletop.actions';
import { redo, redoSuccess, undo, undoSuccess } from './time-machine.actions';

const timeMachineActionTypes: string[] = [
  undo.type,
  undoSuccess.type,
  redo.type,
  redoSuccess.type,
  undoAddMonster.type,
  undoAddMonsterStandee.type
];

type ReversibleAction = 
  | ReturnType<typeof addMonster>
  | ReturnType<typeof addMonsterStandee>;

function getReverseAction(state: AppState, action: ReversibleAction): Action {
  switch (action.type) {
    case addMonster.type:
      return undoAddMonster({ key: action.key });
    case addMonsterStandee.type:
      return undoAddMonsterStandee({ key: action.key, id: action.id });
  }
  // throw `Unexpected Action: '${action.type}`;
}

function logPast(nextReducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state, action) {
    if (!state || action.type.startsWith('@ngrx/effects') || timeMachineActionTypes.includes(action.type)) {
      return nextReducer(state, action);
    }
    return nextReducer(
      {
        ...state,
        timeMachine: {
          ...state.timeMachine,
          past: [
            ...state.timeMachine.past,
            { originalAction: action, reverseAction: getReverseAction(state, action as ReversibleAction) }
          ],
          future: []
        }
      },
      action
    );
  };
}

export const timeMachineMetaReducers = [logPast];

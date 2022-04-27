import { Action, ActionReducer } from '@ngrx/store';
import { AppState } from 'store/app.state';
import {
  addMonster,
  addMonsterStandee,
  drawMonsterAbilityCardsSuccess,
  undoAddMonster,
  undoAddMonsterStandee,
  undoDrawMonsterAbilityCards
} from 'store/tabletop/tabletop.actions';

const trackActionTypes: string[] = [
  addMonster.type,
  addMonsterStandee.type,
  drawMonsterAbilityCardsSuccess.type
];

type ReversibleAction = 
  | ReturnType<typeof addMonster>
  | ReturnType<typeof addMonsterStandee>
  | ReturnType<typeof drawMonsterAbilityCardsSuccess>;

function getReverseAction(state: AppState, action: ReversibleAction): Action {
  switch (action.type) {
    case addMonster.type:
      return undoAddMonster({ key: action.key });
    case addMonsterStandee.type:
      return undoAddMonsterStandee({ key: action.key, id: action.id });
    case drawMonsterAbilityCardsSuccess.type:
      return undoDrawMonsterAbilityCards({
        abilityCardIds: Object.entries(action.abilityCardIds)
          .reduce(
            (acc, [key, id]): { [key: string]: { previousId: number | null, nextId: number } } => ({
              ...acc,
              [key]: {
                previousId: state.tabletop.monsters.entities[key]?.currentAbilityCardId,
                nextId: id
              }
            }),
            { }
          )
      });
  }
  // throw `Unexpected Action: '${action.type}`;
}

function logPast(nextReducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state, action) {
    if (!state || !trackActionTypes.includes(action.type)) {
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

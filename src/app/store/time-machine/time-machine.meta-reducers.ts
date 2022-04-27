import { Action, ActionReducer } from '@ngrx/store';
import { MonsterSet } from 'models/monster-set';
import { AppState } from 'store/app.state';
import {
  addMonster,
  addMonsterStandee,
  drawMonsterAbilityCardsSuccess,
  nextRound,
  undoAddMonster,
  undoAddMonsterStandee,
  undoDrawMonsterAbilityCards,
  undoNextRound
} from 'store/tabletop/tabletop.actions';

const trackActionTypes: string[] = [
  addMonster.type,
  addMonsterStandee.type,
  drawMonsterAbilityCardsSuccess.type,
  nextRound.type
];

type ReversibleAction = 
  | ReturnType<typeof addMonster>
  | ReturnType<typeof addMonsterStandee>
  | ReturnType<typeof drawMonsterAbilityCardsSuccess>
  | ReturnType<typeof nextRound>;

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
    case nextRound.type:
      return undoNextRound({
        abilityCardIds: Object.values(state.tabletop.monsters.entities)
          .filter((monster): monster is MonsterSet => Boolean(monster))
          .reduce(
            (acc, monster): { [key: string]: number } => ({
              ...acc,
              [monster.key]: monster.currentAbilityCardId
            }),
            { }
          )
      })
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

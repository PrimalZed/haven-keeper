import { createReducer, on } from '@ngrx/store';
import { monstersAdapter } from './monsters.adapter';
import {
    addMonster,
    addMonsterStandee,
    drawMonsterAbilityCardsSuccess, 
    undoAddMonster,
    undoAddMonsterStandee, 
    undoDrawMonsterAbilityCards
} from './tabletop.actions';
import { TabletopState } from './tabletop.state';

export const initialTabletopState: TabletopState = {
    monsters: monstersAdapter.getInitialState()
};

export const tabletopReducer = createReducer<TabletopState>(
    initialTabletopState,
    on(addMonster, (state, { key, level }) => ({
        ...state,
        monsters: monstersAdapter.addOne({
            key,
            level,
            standees: [],
            currentAbilityCardId: null,
            drawnAbilityCardIds: []
        }, state.monsters)
    })),
    on(undoAddMonster, (state, { key }) => ({
        ...state,
        monsters: monstersAdapter.removeOne(key, state.monsters)
    })),
    on(addMonsterStandee, (state, { key, id, rank }) => ({
        ...state,
        monsters: monstersAdapter.mapOne({
            id: key,
            map: (x) => ({
                ...x,
                standees: [
                    ...x.standees,
                    { id, rank, hitPoints: 5, conditions: [] }
                ]
            }) 
        }, state.monsters)
    })),
    on(undoAddMonsterStandee, (state, { key, id }) => ({
        ...state,
        monsters: monstersAdapter.mapOne({
            id: key,
            map: (x) => ({
                ...x,
                standees: x.standees.filter((y) => y.id !== id)
            })
        }, state.monsters)
    })),
    on(drawMonsterAbilityCardsSuccess, (state, { abilityCardIds }) => ({
        ...state,
        monsters: monstersAdapter.map((monster) => ({
            ...monster,
            currentAbilityCardId: abilityCardIds[monster.key],
            drawnAbilityCardIds: [
                ...monster.drawnAbilityCardIds,
                abilityCardIds[monster.key]
            ]
        }), state.monsters)
    })),
    on(undoDrawMonsterAbilityCards, (state, { abilityCardIds }) => ({
        ...state,
        monsters: monstersAdapter.map((monster) => ({
            ...monster,
            currentAbilityCardId: abilityCardIds[monster.key].previousId,
            drawnAbilityCardIds: monster.drawnAbilityCardIds
                .filter((id) => id !== abilityCardIds[monster.key].nextId)
        }), state.monsters)
    }))
);

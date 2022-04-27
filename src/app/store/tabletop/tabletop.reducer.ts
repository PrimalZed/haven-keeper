import { createReducer, on } from '@ngrx/store';
import { monstersAdapter } from './monsters.adapter';
import { addMonster, addMonsterStandee, undoAddMonster, undoAddMonsterStandee } from './tabletop.actions';
import { TabletopState } from './tabletop.state';

export const initialTabletopState: TabletopState = {
    monsters: monstersAdapter.getInitialState()
};

export const tabletopReducer = createReducer<TabletopState>(
    initialTabletopState,
    on(addMonster, (state, { key, level }) => ({
        ...state,
        monsters: monstersAdapter.addOne({ key, level, standees: [] }, state.monsters)
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
    }))
);

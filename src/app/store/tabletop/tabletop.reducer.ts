import { createReducer, on } from '@ngrx/store';
import { monstersAdapter } from './monsters.adapter';
import { addMonster } from './tabletop.actions';
import { TabletopState } from './tabletop.state';

export const initialTabletopState: TabletopState = {
    monsters: monstersAdapter.getInitialState()
};

export const tabletopReducer = createReducer<TabletopState>(
    initialTabletopState,
    on(addMonster, (state, { key, level }) => ({
        ...state,
        monsters: monstersAdapter.addOne({ key, level, standees: [] }, state.monsters)
    }))
);

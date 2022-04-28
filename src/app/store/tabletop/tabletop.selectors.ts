import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Element, ElementalInfusion } from 'models/element';
import { TabletopState } from './tabletop.state';

export const selectTabletopState = createFeatureSelector<TabletopState>('tabletop');

export const selectTabletopStep = createSelector(
    selectTabletopState,
    (state) => state.step
);

export const selectRound = createSelector(
    selectTabletopState,
    (state) => state.round
);

export const selectElementalInfusion = createSelector(
    selectTabletopState,
    (state): { [element in Element]: ElementalInfusion} => ({
        'fire': state.elementalInfusion.fire,
        'ice': state.elementalInfusion.ice,
        'air': state.elementalInfusion.air,
        'earth': state.elementalInfusion.earth,
        'light': state.elementalInfusion.light,
        'dark': state.elementalInfusion.dark
    })
);

import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { CatalogService } from 'services/catalog.service';
import { AppState } from './app.state';
import { p2pReducer } from './p2p/p2p.reducer';
import { getTabletopReducer } from './tabletop/tabletop.reducer';
import { timeMachineReducer } from './time-machine/time-machine.reducer';

export const APP_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('APP_REDUCERS');

export function getReducers(catalogService: CatalogService): ActionReducerMap<AppState> {
  return {
    p2p: p2pReducer,
    tabletop: getTabletopReducer(catalogService),
    timeMachine: timeMachineReducer
  };
}
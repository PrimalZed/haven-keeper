import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { CatalogService } from 'services/catalog.service';
import { AppState } from './app.state';
import { getTabletopReducer } from './tabletop/tabletop.reducer';
import { timeMachineReducer } from './time-machine/time-machine.reducer';

export const APP_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('APP_REDUCERS');

export function getReducers(catalogService: CatalogService): ActionReducerMap<AppState> {
  return {
    tabletop: getTabletopReducer(catalogService),
    timeMachine: timeMachineReducer
  }
}
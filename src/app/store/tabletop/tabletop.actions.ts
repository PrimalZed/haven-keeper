import { createAction, props } from '@ngrx/store';
import { Level } from 'models/level';

export const addMonster = createAction(
    "[Tabletop] Add Monster",
    props<{ key: string, level: Level }>()
);

export type TabletopActions =
    | typeof addMonster;

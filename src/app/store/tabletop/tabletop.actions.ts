import { createAction, props } from '@ngrx/store';
import { Level } from 'models/level';

export const addMonster = createAction(
    "[Tabletop] Add Monster",
    props<{ key: string, level: Level }>()
);

export const addMonsterStandee = createAction(
    "[Tabletop] Add Monster Standee",
    props<{ key: string, id: number, rank: 'basic' | 'elite' }>()
);

export type TabletopActions =
    | typeof addMonster;

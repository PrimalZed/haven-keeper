import { createAction, props } from '@ngrx/store';
import { Element, ElementalInfusion } from 'models/element';
import { Level } from 'models/level';

export const addMonster = createAction(
    "[Tabletop] Add Monster",
    props<{ key: string, level: Level }>()
);

export const undoAddMonster = createAction(
    "[Tabletop] Undo Add Monster",
    props<{ key: string }>()
);

export const addMonsterStandee = createAction(
    "[Tabletop] Add Monster Standee",
    props<{ key: string, id: number, rank: 'normal' | 'elite' }>()
);

export const undoAddMonsterStandee = createAction(
    "[Tabletop] Undo Add Monster Standee",
    props<{ key: string, id: number }>()
);

export const drawMonsterAbilityCards = createAction(
    "[Tabletop] Draw Monster Ability Cards"
);

export const drawMonsterAbilityCardsSuccess = createAction(
    "[Tabletop] Draw Monster Ability Cards Success",
    props<{ abilityCardIds: { [key: string]: number } }>()
);

export const undoDrawMonsterAbilityCards = createAction(
    "[Tabletop] Undo Draw Monster Ability Cards",
    props<{ abilityCardIds: { [key: string]: { previousId: number | null, nextId: number} } }>()
);

export const infuseElement = createAction(
    "[Tabletop] Infuse Element",
    props<{ element: Element }>()
);

export const undoInfuseElement = createAction(
    "[Tabletop] Undo Infuse Element",
    props<{ element: Element }>()
);

export const nextRound = createAction(
    "[Tabletop] Next Round"
);

export const undoNextRound = createAction(
    "[Tabletop] Undo Next Round",
    props<{
        elementalInfusion: { [element in Element]: ElementalInfusion },
        abilityCardIds: { [key: string]: number | null }
    }>()
);

export type TabletopActions =
    | typeof addMonster
    | typeof addMonsterStandee;

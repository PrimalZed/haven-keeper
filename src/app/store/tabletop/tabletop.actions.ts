import { createAction, props } from '@ngrx/store';
import { Element, ElementalInfusion } from 'models/element';

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
        characterInitiatives: { [key: string]: number | null },
        abilityCardIds: { [key: string]: number | null }
    }>()
);

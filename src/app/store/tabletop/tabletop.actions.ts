import { createAction, props } from '@ngrx/store';
import { Element, ElementalInfusion } from 'models/element';
import { TabletopState } from './tabletop.state';

export const loadTabletop = createAction(
  "[Tabletop] Load Tabletop",
  props<{ state: TabletopState }>()
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
    characterInitiatives: { [key: string]: number | null },
    abilityCardIds: { [key: string]: number | null },
    drawnAbilityCardIds: { [key: string]: number[] }
  }>()
);

export const clearTabletop = createAction(
  "[Tabletop] Clear Tabletop"
);

export const undoClearTabletop = createAction(
  "[Tabletop] Undo Clear Tabletop",
  props<{ oldState: TabletopState }>()
);

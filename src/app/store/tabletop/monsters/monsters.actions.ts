import { createAction, props } from '@ngrx/store';
import { Level } from 'models/level';

export const addMonster = createAction(
  "[Tabletop] [Monsters] Add Monster",
  props<{ key: string, level: Level }>()
);

export const undoAddMonster = createAction(
  "[Tabletop] [Monsters] Undo Add Monster",
  props<{ key: string }>()
);

export const addMonsterStandee = createAction(
  "[Tabletop] [Monsters] Add Monster Standee",
  props<{ key: string, id: number, rank: 'normal' | 'elite' }>()
);

export const undoAddMonsterStandee = createAction(
  "[Tabletop] [Monsters] Undo Add Monster Standee",
  props<{ key: string, id: number }>()
);

export const drawMonsterAbilityCards = createAction(
  "[Tabletop] [Monsters] Draw Monster Ability Cards"
);

export const drawMonsterAbilityCardsSuccess = createAction(
  "[Tabletop] [Monsters] Draw Monster Ability Cards Success",
  props<{ abilityCardIds: { [key: string]: number } }>()
);

export const undoDrawMonsterAbilityCards = createAction(
  "[Tabletop] [Monsters] Undo Draw Monster Ability Cards",
  props<{ abilityCardIds: { [key: string]: { previousId: number | null, nextId: number} } }>()
);

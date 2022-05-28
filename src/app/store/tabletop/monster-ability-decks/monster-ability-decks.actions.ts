import { createAction, props } from '@ngrx/store';

export const drawMonsterAbilityCards = createAction(
  "[Tabletop] [Monster Ability Decks] Draw Monster Ability Cards",
  props<{ characterInitiatives: { [key: string]: number } }>()
);

export const drawMonsterAbilityCardsSuccess = createAction(
  "[Tabletop] [Monster Ability Decks] Draw Monster Ability Cards Success",
  props<{ characterInitiatives: { [key: string]: number }, abilityCardIds: { [key: string]: number } }>()
);

export const undoDrawMonsterAbilityCards = createAction(
  "[Tabletop] [Monster Ability Decks] Undo Draw Monster Ability Cards",
  props<{ abilityCardIds: { [key: string]: { previousId: number | null, nextId: number} } }>()
);

export const drawMonsterAbilityCard = createAction(
  "[Tabletop] [Monster Ability Decks] Draw Monster Ability Card",
  props<{ key: string }>()
);

export const drawMonsterAbilityCardSuccess = createAction(
  "[Tabletop] [Monster Ability Decks] Draw Monster Ability Card Success",
  props<{ key: string, cardId: number }>()
);

export const undoDrawMonsterAbilityCard = createAction(
  "[Tabletop] [Monster Ability Decks] Undo Draw Monster Ability Card",
  props<{ key: string, cardId: number }>()
);

export const MonsterAbilityDecksActions = [
  drawMonsterAbilityCards,
  drawMonsterAbilityCardsSuccess,
  undoDrawMonsterAbilityCards,
  drawMonsterAbilityCard,
  drawMonsterAbilityCardSuccess,
  undoDrawMonsterAbilityCard
];

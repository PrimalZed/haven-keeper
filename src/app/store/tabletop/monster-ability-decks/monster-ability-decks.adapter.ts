import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { MonsterAbilityDeck } from 'models/monster-ability-deck';

export const monsterAbilityDecksAdapter: EntityAdapter<MonsterAbilityDeck> = createEntityAdapter<MonsterAbilityDeck>({
    selectId: (monsterAbilityDeck: MonsterAbilityDeck) => monsterAbilityDeck.key
});

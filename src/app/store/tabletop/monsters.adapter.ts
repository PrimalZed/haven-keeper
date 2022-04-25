import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { MonsterSet } from 'models/monster-set';

export const monstersAdapter: EntityAdapter<MonsterSet> = createEntityAdapter<MonsterSet>({
    selectId: (monsterSet: MonsterSet) => monsterSet.key
});

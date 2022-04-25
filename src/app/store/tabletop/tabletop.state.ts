import { EntityState } from '@ngrx/entity';
import { MonsterSet } from 'models/monster-set';

export interface TabletopState {
    monsters: EntityState<MonsterSet>;
}

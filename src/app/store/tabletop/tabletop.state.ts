import { EntityState } from '@ngrx/entity';
import { MonsterSet } from 'models/monster-set';

export interface TabletopState {
    step: 'card-selection' | 'actions';
    round: number;
    monsters: EntityState<MonsterSet>;
}

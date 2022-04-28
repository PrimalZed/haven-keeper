import { EntityState } from '@ngrx/entity';
import { Element, ElementalInfusion } from 'models/element';
import { MonsterSet } from 'models/monster-set';

export interface TabletopState {
    step: 'card-selection' | 'actions';
    round: number;
    elementalInfusion: { [element in Element]: ElementalInfusion };
    monsters: EntityState<MonsterSet>;
}

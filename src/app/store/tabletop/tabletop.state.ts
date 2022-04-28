import { EntityState } from '@ngrx/entity';
import { Character } from 'models/character';
import { Element, ElementalInfusion } from 'models/element';
import { MonsterSet } from 'models/monster-set';

export interface TabletopState {
  step: 'card-selection' | 'actions';
  round: number;
  elementalInfusion: { [element in Element]: ElementalInfusion };
  characters: EntityState<Character>;
  monsters: EntityState<MonsterSet>;
}

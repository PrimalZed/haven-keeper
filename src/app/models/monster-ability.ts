import { AttackEffect } from './attack-effect';
import { ConditionKey } from './condition';
import { Element } from './element';

export type MonsterAbility =
  | {
    kind: 'movement';
    amount: number;
  }
  | {
    kind: 'attack';
    range: number;
    modifier: number;
    effects: AttackEffect[];
  }
  | {
    kind: 'heal';
    amount: number;
    target: 'self' | 'ally';
    range: number;
  }
  | {
    kind: 'condition';
    condition: ConditionKey;
    target: 'self' | 'ally' | 'enemy';
    range: number;
    consumeElement?: Element;
  }
  | {
    kind: 'infuseElement'
    element: Element;
  }
  | {
    kind: 'loot';
    range: number;
  };

export interface MonsterAbilityCard {
  name: string;
  initiative: number;
  abilities: MonsterAbility[];
  shuffle: boolean;
}

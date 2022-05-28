import { AttackEffect } from './attack-effect';
import { BonusKey } from './bonus';
import { ConditionKey } from './condition';
import { Element } from './element';

export type MonsterAbility =
  | {
    kind: 'move';
    modifier: number;
  }
  | {
    kind: 'attack';
    modifier: number;
    target?: number;
    range?: number;
    effects?: AttackEffect[];
    aoe?: any;
  }
  | {
    kind: 'heal';
    amount: number;
    target?: 'self' | 'ally';
    range?: number;
  }
  | {
    kind: 'bonus';
    bonus: BonusKey;
    amount: number;
  }
  | {
    kind: 'condition';
    condition: ConditionKey;
    target: 'self' | 'ally' | 'enemy';
    range?: number;
    consumeElement?: Element;
  }
  | {
    kind: 'forcedMovement';
    direction: 'push' | 'pull';
    amount: number;
    target?: 'adjacent'
  }
  | {
    kind: 'infuseElement'
    element: Element;
  }
  | {
    kind: 'loot';
    range: number;
  }
  | {
    kind: 'special';
    id: number;
  }
  | {
    kind: 'other';
    description: string;
  };

export interface MonsterAbilityCard {
  id: number;
  name: string;
  initiative: number;
  abilities: MonsterAbility[];
  deathAbilities?: MonsterAbility[];
  shuffle?: true;
}

import { AttackEffect } from './attack-effect';
import { BonusKey } from './bonus';
import { ConditionKey, NegativeConditionKey } from './condition';
import { Element, MixedElement } from './element';

export type MonsterAbility =
  | {
    kind: 'move';
    modifier: number;
    jump?: true;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'attack';
    modifier: number;
    target?: number | 'adjacent' | 'all';
    pierce?: number;
    range?: number;
    effects?: AttackEffect[];
    aoe?: any;
    other?: string;
    elementEnhancements?: {
      [element in MixedElement]?: {
        modifier?: number;
        range?: number;
        target?: number;
        conditions?: NegativeConditionKey[]
      };
    };
    consumeElement?: MixedElement;
  }
  | {
    kind: 'heal';
    amount: number;
    target?: 'self' | 'ally';
    range?: number;
    elementEnhancements?: {
      [element in MixedElement]?: {
        modifier?: number;
        range?: number;
        target?: number;
      };
    };
    consumeElement?: MixedElement;
  }
  | {
    kind: 'bonus';
    bonus: BonusKey;
    amount: number;
    range?: number;
    elementEnhancements?: {
      [element in MixedElement]?: {
        other: string;
      };
    };
    consumeElement?: MixedElement;
  }
  | {
    kind: 'condition';
    conditions: ConditionKey[];
    target: 'self' | 'ally' | 'adjacentAllies' | 'allAlliesWithinRange' | 'allAllies' | 'enemy' | 'adjacentEnemies' | 'allEnemiesWithinRange' | 'allEnemies';
    range?: number;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'forcedMovement';
    direction: 'push' | 'pull';
    amount: number;
    target?: 'adjacent'
    elementEnhancements?: {
      [element in MixedElement]?: {
        other: string;
      };
    };
    consumeElement?: MixedElement;
  }
  | {
    kind: 'infuseElement'
    element: Element;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'loot';
    range: number;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'special';
    id: number;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'other';
    description: string;
    consumeElement?: MixedElement;
  };

export interface MonsterAbilityCard {
  id: number;
  name: string;
  initiative: number;
  abilities: MonsterAbility[];
  deathAbilities?: MonsterAbility[];
  shuffle?: true;
}

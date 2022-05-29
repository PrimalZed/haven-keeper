import { AttackEffect } from './attack-effect';
import { BonusKey } from './bonus';
import { ConditionKey } from './condition';
import { Element, MixedElement } from './element';

export type MonsterAbility =
  | {
    kind: 'move';
    modifier: number;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'attack';
    modifier: number;
    target?: number;
    range?: number;
    effects?: AttackEffect[];
    aoe?: any;
    elementEnhancements?: {
      [element in MixedElement]?: {
        modifier?: number;
        target?: number;
      }
    },
    consumeElement?: MixedElement;
  }
  | {
    kind: 'heal';
    amount: number;
    target?: 'self' | 'ally';
    range?: number;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'bonus';
    bonus: BonusKey;
    amount: number;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'condition';
    conditions: ConditionKey[];
    target: 'self' | 'ally' | 'allAllies' | 'enemy' | 'allEnemies';
    range?: number;
    consumeElement?: MixedElement;
  }
  | {
    kind: 'forcedMovement';
    direction: 'push' | 'pull';
    amount: number;
    target?: 'adjacent'
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

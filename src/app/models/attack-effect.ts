import { ConditionKey } from './condition';
import { Element } from './element';

export type EffectKey = 'add-target' | 'pierce' | 'push' | 'pull';

export type AttackEffect = 
  | {
    kind: 'effect';
    effect: EffectKey;
    amount: number;
  }
  | {
    kind: 'target';
    amount: number | 'all';
  }
  | {
    kind: 'infuseElement';
    element: Element;
  }
  | {
    kind: 'condition';
    condition: ConditionKey;
  }
  | {
    kind: 'other';
    description: string;
  };
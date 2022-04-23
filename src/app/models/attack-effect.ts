import { ConditionKey } from './condition';
import { Element } from './element';

export type AttackEffect = 
  | {
    kind: 'add';
    amount: number;
  }
  | {
    kind: 'pierce';
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
    kind: 'push';
    amount: number;
  }
  | {
    kind: 'pull';
    amount: number;
  }
  | {
    kind: 'other';
    text: string;
  };
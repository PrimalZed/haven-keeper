export type PositiveConditionKey = 'regenerate' | 'ward' | 'invisible' | 'strengthen' | 'bless';
export type NegativeConditionKey = 'wound' | 'brittle' | 'bane' | 'poison' | 'immobilize' | 'disarm' | 'impair' | 'stun' | 'muddle' | 'curse';
export type ConditionKey = PositiveConditionKey | NegativeConditionKey;

export const positiveConditions: PositiveConditionKey[] = [
  'regenerate', 'ward', 'invisible', 'strengthen', 'bless'
];

export const negativeConditions: NegativeConditionKey[] = [
  'wound', 'brittle', 'bane', 'poison', 'immobilize', 'disarm', 'impair', 'stun', 'muddle', 'curse'
];

export const conditions = [...positiveConditions, ...negativeConditions];

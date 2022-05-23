import { ConditionKey } from './condition';

export interface MonsterStandee {
  id: number;
  rank: 'normal' | 'elite' | 'boss';
  hitPoints: number;
  conditions: ConditionKey[];
}

export interface MonsterSet {
  key: string;
  standees: MonsterStandee[];
}

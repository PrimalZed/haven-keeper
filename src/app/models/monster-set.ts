import { ScenarioLevel } from './scenario-level';

export interface MonsterStandee {
  id: number;
  rank: 'normal' | 'elite' | 'boss';
  hitPoints: number;
  conditions: any[];
}

export interface MonsterSet {
  key: string;
  standees: MonsterStandee[];
}

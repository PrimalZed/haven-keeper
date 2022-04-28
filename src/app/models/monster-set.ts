import { ScenarioLevel } from './scenario-level';

export interface MonsterStandee {
  id: number;
  rank: 'normal' | 'elite' | 'boss';
  hitPoints: number;
  conditions: any[];
}

export interface MonsterSet {
  key: string;
  level: ScenarioLevel;
  standees: MonsterStandee[];
  currentAbilityCardId: number | null;
  drawnAbilityCardIds: number[];
}

import { Level } from './level';

export interface MonsterStandee {
  id: number;
  rank: 'normal' | 'elite' | 'boss';
  hitPoints: number;
  conditions: any[];
}

export interface MonsterSet {
  key: string;
  level: Level;
  standees: MonsterStandee[];
  currentAbilityCardId: number | null;
  drawnAbilityCardIds: number[];
}

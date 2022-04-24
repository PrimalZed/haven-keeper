import { Level } from './level';

export interface MonsterStandee {
  id: number;
  rank: 'basic' | 'elite' | 'boss';
  hitPoints: number;
  conditions: any[];
}

export interface MonsterSet {
  key: string;
  level: Level;
  standees: MonsterStandee[];
}

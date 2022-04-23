import { Level } from './level';

export interface Monster {
  key: string;
  level: Level;
  hitPoints: number;
  base: number;
  conditions: any;
}

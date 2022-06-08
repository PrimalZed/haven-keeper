import { ConditionKey } from './condition';

export type CharacterLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SummonColor = 'blue' | 'green' | 'yellow' | 'orange' | 'white' | 'violet' | 'magenta' | 'red';

export interface CharacterStatCard {
  key: string;
  hitPoints: { [level in CharacterLevel]: number }[];
}

export interface Character {
  key: string;
  level: CharacterLevel;
  figures: {
    hitPoints: number;
    conditions: ConditionKey[];
  }[];
  summons: {
    color: SummonColor;
    hitPoints: number;
    movement: number;
    attack: number;
    range: number;
    conditions: ConditionKey[];
  }[];
  initiative: number | null;
}

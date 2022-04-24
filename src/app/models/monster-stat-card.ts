import { AttackEffect } from './attack-effect';
import { BonusKey } from './bonus';
import { NegativeConditionKey } from './condition';
import { Level } from './level';

export interface MonsterLevel {
  hitPoints: number;
  movement: number;
  attack: number;
  range: number;
  bonuses: { [key in BonusKey]?: number };
  attackEffects: AttackEffect[];
  immunities: NegativeConditionKey[];
}

interface MonsterBase {
  key: string;
  name: string;
  levels: { [level in Level]: MonsterLevel };
}

export interface BossStatCard extends MonsterBase {
  kind: 'boss';
  specialLevels: { [level in Level]: string[]};
}

export interface BasicMonsterStatCard extends MonsterBase {
  kind: 'basic';
  eliteLevels: { [level in Level]: MonsterLevel };
}

export type MonsterStatCard = BossStatCard | BasicMonsterStatCard;

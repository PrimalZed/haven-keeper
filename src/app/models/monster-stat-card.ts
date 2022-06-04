import { AttackEffect } from './attack-effect';
import { BonusKey } from './bonus';
import { NegativeConditionKey } from './condition';
import { MonsterAbility } from './monster-ability-card';
import { ScenarioLevel } from './scenario-level';

export interface MonsterLevel {
  hitPoints: number;
  movement: number;
  attack: number;
  range?: number;
  bonuses?: { [key in BonusKey]?: number | { amount: number, range: number } };
  attackEffects?: AttackEffect[];
  immunities?: NegativeConditionKey[];
}

interface MonsterBase {
  key: string;
  name: string;
  flying?: true;
  levels: { [level in ScenarioLevel]: MonsterLevel };
}

export interface BossStatCard extends MonsterBase {
  kind: 'boss';
  specials: { 1: MonsterAbility[]; 2: MonsterAbility[]; };
}

export interface NormalMonsterStatCard extends MonsterBase {
  kind: 'normal';
  abilityDeckKey: string;
  eliteLevels: { [level in ScenarioLevel]: MonsterLevel };
}

export type MonsterStatCard = BossStatCard | NormalMonsterStatCard;

export function getAbilityDeckKey(statCard: MonsterStatCard) {
  return statCard.kind === 'normal'
    ? statCard.abilityDeckKey
    : 'boss';
}

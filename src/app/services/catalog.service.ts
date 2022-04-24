import { Injectable } from '@angular/core';
import { MonsterStatCard } from '../models/monster-stat-card';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  monsters: MonsterStatCard[] = [
    {
      key: 'placeholder',
      kind: 'basic',
      name: 'Test Monster',
      levels: {
        0: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        1: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        2: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        3: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        4: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        5: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        6: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        7: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        }
      },
      eliteLevels: {
        0: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        1: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        2: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        3: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        4: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        5: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        6: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        },
        7: {
          hitPoints: 5,
          movement: 2,
          attack: 1,
          range: 1,
          attackEffects: [],
          bonuses: { },
          immunities: []
        }
      }
    }
  ];

  get monsterEntities(): { [key: string]: MonsterStatCard } {
    return this.monsters
      .reduce(
        (acc, monster) => ({
          ...acc,
          [monster.key]: monster
        }),
        { }
      );
  }
}

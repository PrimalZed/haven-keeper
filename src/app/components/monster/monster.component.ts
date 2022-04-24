import { Component, HostBinding, Input } from '@angular/core';
import { Monster } from 'src/app/models/monster';
import { MonsterStatCard } from 'src/app/models/monster-stat-card';

@Component({
  selector: 'monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterComponent {
  @Input() public monster: Monster = {
    key: 'placeholder',
    level: 0,
    standees: []
  }
  public statCard: MonsterStatCard = {
    key: 'placeholder',
    kind: 'basic',
    name: 'Test Monster',
    levels: {
      0: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      1: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      2: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      3: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      4: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      5: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      6: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      7: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
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
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      1: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      2: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      3: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      4: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      5: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      6: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      },
      7: {
        hitPoints: 5,
        movement: 2,
        attack: 1,
        attackEffects: [],
        bonuses: { },
        immunities: []
      }
    }
  }
  public initiative = 53;
  private get rows() {
    return 2 + (this.monster.standees.length ? 1 : 0);
  };

  // @HostBinding('style.grid-row') get gridRow() { return `span ${this.rows}`}
}

import { Component, Input } from '@angular/core';
import { ScenarioLevel } from 'models/scenario-level';
import { NormalMonsterStatCard, MonsterLevel } from 'models/monster-stat-card';

@Component({
  selector: 'monster-stat-card',
  templateUrl: './monster-stat-card.component.html',
  styleUrls: ['./monster-stat-card.component.scss']
})
export class MonsterStatCardComponent {
  @Input() level: ScenarioLevel = 0;
  @Input() statCard!: NormalMonsterStatCard;

  public get normalLevel(): MonsterLevel {
    return this.statCard.levels[this.level];
  }

  public get eliteLevel(): MonsterLevel {
    return this.statCard.eliteLevels[this.level];
  }
}

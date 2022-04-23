import { Component, HostBinding } from '@angular/core';
import { Monster, MonsterStandee } from 'src/app/models/monster';
import { MonsterStatCard } from 'src/app/models/monster-stat-card';

@Component({
  selector: 'monster',
  templateUrl: './monster.component.html'
})
export class MonsterComponent {
  public monster: Monster = {
    key: 'placeholder',
    level: 0,
    standees: []
  }
  public name = "Test Monster";
  public initiative = 53;
  private get rows() {
    return 2 + (this.monster.standees.length ? 1 : 0);
  };

  @HostBinding('style.grid-row') get gridRow() { return `span ${this.rows}`}
}

import { Component, HostBinding } from '@angular/core';
import { MonsterStatCard } from 'src/app/models/monster-stat-card';

@Component({
  selector: 'monster',
  templateUrl: './monster.component.html'
})
export class MonsterComponent {
  public name = "Test Monster";
  public level = 0;
  private standees = [];
  private get rows() {
    return 2 + (this.standees.length ? 1 : 0);
  };

  @HostBinding('style.grid-row') get gridRow() { return `span ${this.rows}`}
}

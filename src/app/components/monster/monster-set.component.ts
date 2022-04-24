import { Component, HostBinding, Input } from '@angular/core';
import { MonsterSet } from 'models/monster-set';
import { MonsterStatCard } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';

@Component({
  selector: 'monster-set',
  templateUrl: './monster-set.component.html',
  styleUrls: ['./monster-set.component.scss']
})
export class MonsterSetComponent {
  @Input() public monster: MonsterSet = {
    key: 'placeholder',
    level: 0,
    standees: []
  }
  public statCard: MonsterStatCard = this.catalogService.monsterEntities[this.monster.key];

  public initiative = 53;
  private get rows() {
    return 2 + (this.monster.standees.length ? 1 : 0);
  };

  // @HostBinding('style.grid-row') get gridRow() { return `span ${this.rows}`}

  constructor(private catalogService: CatalogService) { }
}

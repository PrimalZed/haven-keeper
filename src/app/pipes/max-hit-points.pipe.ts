import { Pipe, PipeTransform } from '@angular/core';
import { MonsterStatCard } from 'models/monster-stat-card';
import { ScenarioLevel } from 'models/scenario-level';
import { CatalogService } from 'services/catalog.service';

export function getMaxHitPoints(statCard: MonsterStatCard, level: ScenarioLevel, rank: 'normal' | 'elite' | 'boss'): number {
  switch (rank) {
    case 'normal':
    case 'boss':
      return statCard.levels[level].hitPoints;
    case 'elite':
      if (statCard.kind === 'boss') {
        throw 'Can\'t have an elite boss'
      }
      return statCard.eliteLevels[level].hitPoints;
  }
}

@Pipe({
  name: 'maxHitPoints'
})
export class MaxHitPointsPipe implements PipeTransform {
  constructor(private catalogService: CatalogService) { }

  transform([monsterKey, level, rank]: [string, ScenarioLevel, 'normal' | 'elite' | 'boss']): number {
    return getMaxHitPoints(this.catalogService.monsterEntities[monsterKey], level, rank);
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonsterAbilityCard } from 'models/monster-ability-card';
import { CatalogService } from 'services/catalog.service';

@Component({
  selector: 'monster-ability-card',
  templateUrl: './monster-ability-card.component.html',
  styleUrls: ['./monster-ability-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterAbilityCardComponent {
  @Input() id: number | null = null;

  get card(): MonsterAbilityCard {
    return this.catalogService.monsterAbilityCardEntities[this.id ?? 0];
  }

  constructor(private catalogService: CatalogService) { }
}

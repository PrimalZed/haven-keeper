import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonsterAbility } from 'models/monster-ability-card';

@Component({
  selector: 'monster-ability',
  templateUrl: './monster-ability.component.html',
  styleUrls: ['./monster-ability.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterAbilityComponent {
  @Input() ability!: MonsterAbility;
}

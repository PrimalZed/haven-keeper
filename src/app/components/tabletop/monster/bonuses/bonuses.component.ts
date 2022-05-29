import { Component, Input } from '@angular/core';
import { AttackEffect } from 'models/attack-effect';
import { BonusKey } from 'models/bonus';
import { NegativeConditionKey } from 'models/condition';

@Component({
  selector: 'bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss']
})
export class BonusesComponent {
  @Input() bonuses: { [key in BonusKey]?: number | { amount: number, range: number } } | undefined;
  @Input() attackEffects: AttackEffect[] | undefined;
  @Input() immunities: NegativeConditionKey[] | undefined;
}

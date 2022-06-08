import { Component, Input } from '@angular/core';
import { SummonColor } from 'models/character';
import { ConditionKey } from 'models/condition';

@Component({
  selector: 'summon',
  templateUrl: './summon.component.html',
  styleUrls: ['./summon.component.scss']
})
export class SummonComponent {
  @Input() summon!: {
    color: SummonColor;
    hitPoints: number;
    movement: number;
    attack: number;
    range: number;
    conditions: ConditionKey[];
  };
}

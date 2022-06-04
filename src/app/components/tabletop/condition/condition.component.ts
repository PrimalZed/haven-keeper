import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionKey } from 'models/condition';

@Component({
  selector: 'condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionComponent {
  @Input() condition!: ConditionKey
  @Input() showLabel: boolean = false;
  @Input() immune: boolean = false;
  @Input() size: 'sm' | 'md' = 'md';
}

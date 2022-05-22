import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionKey } from 'models/condition';

@Component({
  selector: 'condition',
  templateUrl: './condition.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionComponent {
  @Input() condition!: ConditionKey
}

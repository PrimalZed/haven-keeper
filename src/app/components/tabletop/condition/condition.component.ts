import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionKey } from 'models/condition';

@Component({
  selector: 'condition',
  templateUrl: './condition.component.html',
  styles: [`rhombus { font-size: 2rem; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionComponent {
  @Input() condition!: ConditionKey
  @Input() showLabel: boolean = false;
}

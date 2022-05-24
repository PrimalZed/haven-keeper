import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionKey } from 'models/condition';

@Component({
  selector: 'condition',
  templateUrl: './condition.component.html',
  styles: [
    `.gloomhaven-condition-icons { font-size: 2rem; }`,
    `.overlap { display: inline-grid; > * { grid-column: 1 / 2; grid-row: 1 / 2; } }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionComponent {
  @Input() condition!: ConditionKey
  @Input() showLabel: boolean = false;
}

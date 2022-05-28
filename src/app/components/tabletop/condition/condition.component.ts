import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionKey } from 'models/condition';

@Component({
  selector: 'condition',
  templateUrl: './condition.component.html',
  styles: [
    `:host { display: flex; align-items: center; }`,
    `img.sm { height: 24px; }`,
    `img.md { height: 32px; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionComponent {
  @Input() condition!: ConditionKey
  @Input() showLabel: boolean = false;
  @Input() size: 'sm' | 'md' = 'md';
}

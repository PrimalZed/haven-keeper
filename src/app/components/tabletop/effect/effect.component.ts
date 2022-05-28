import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EffectKey } from 'models/attack-effect';

@Component({
  selector: 'effect',
  templateUrl: './effect.component.html',
  styles: [
    `:host { display: flex; align-items: center; }`,
    `img.sm { height: 24px; }`,
    `img.md { height: 32px; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectComponent {
  @Input() effect!: EffectKey
  @Input() amount!: number;
  @Input() showLabel: boolean = false;
  @Input() size: 'sm' | 'md' = 'md';
}

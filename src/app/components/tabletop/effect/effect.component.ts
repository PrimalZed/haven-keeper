import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EffectKey } from 'models/attack-effect';

@Component({
  selector: 'effect',
  templateUrl: './effect.component.html',
  styles: [
    `rhombus { font-size: 2rem; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectComponent {
  @Input() effect!: EffectKey
  @Input() amount!: number;
  @Input() showLabel: boolean = false;
}

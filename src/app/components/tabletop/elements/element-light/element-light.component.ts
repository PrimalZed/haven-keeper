import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'element-light',
  templateUrl: './element-light.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementLightComponent {
  @Input() appearance: 'outline' | 'fill' = 'fill';
}

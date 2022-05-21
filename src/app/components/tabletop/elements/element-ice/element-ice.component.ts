import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'element-ice',
  templateUrl: './element-ice.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementIceComponent {
  @Input() appearance: 'outline' | 'fill' = 'fill';
}

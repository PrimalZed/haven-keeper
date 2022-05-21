import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'element-air',
  templateUrl: './element-air.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementAirComponent {
  @Input() appearance: 'outline' | 'fill' = 'fill';
}

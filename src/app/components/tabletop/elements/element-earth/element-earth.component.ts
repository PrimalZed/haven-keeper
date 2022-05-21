import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'element-earth',
  templateUrl: './element-earth.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementEarthComponent {
  @Input() appearance: 'outline' | 'fill' = 'fill';
}

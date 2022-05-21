import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'element-dark',
  templateUrl: './element-dark.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementDarkComponent {
  @Input() appearance: 'outline' | 'fill' = 'fill';
}

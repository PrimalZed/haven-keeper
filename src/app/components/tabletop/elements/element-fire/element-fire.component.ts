import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'element-fire',
  templateUrl: './element-fire.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementFireComponent {
  @Input() appearance: 'outline' | 'fill' = 'fill';
}

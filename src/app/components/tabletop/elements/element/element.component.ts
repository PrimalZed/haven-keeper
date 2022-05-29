import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MixedElement } from 'models/element';

@Component({
  selector: 'element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementComponent {
  @Input() element!: MixedElement;
  @Input() consume: boolean = false;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rhombus',
  templateUrl: './rhombus.component.html',
  styles: [`:host ::ng-deep .overlap { display: inline-grid; > * { grid-column: 1 / 2; grid-row: 1 / 2; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RhombusComponent { }

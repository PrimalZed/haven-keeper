import { Component, Input } from '@angular/core';
import { SummonColor } from 'models/character';

@Component({
  selector: 'summon-color',
  templateUrl: './summon-color.component.svg',
  styles: [`:host { display: contents; }`]
})
export class SummonColorComponent {
  @Input() color!: SummonColor;
  @Input() faded: boolean = false;

  public get fillColor(): string {
    switch (this.color) {
      case 'blue':
        return '#3de4fb';
      case 'green':
        return '#1cfa2c';
      case 'magenta':
        return '#ff20a7';
      case 'orange':
        return '#fa5b21';
      case 'red':
        return '#ff2238';
      case 'violet':
        return '#9c29fa';
      case 'white':
        return '#b2b2b2';
      case 'yellow':
        return '#fae32b';
      default:
        return this.color;
    }
  }
}

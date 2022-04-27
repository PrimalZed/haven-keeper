import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifier'
})
export class ModifierPipe implements PipeTransform {
  transform(value: number): unknown {
    return value >= 0
      ? `+${value}`
      : value;
  }
}

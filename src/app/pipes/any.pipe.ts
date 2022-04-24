import { Pipe, PipeTransform } from '@angular/core';

/**
 * noop pipe to force input on mismatched type
 * ngSwitch doesn't work with type discrimination
 * @see https://github.com/angular/angular/issues/34522 
 */
@Pipe({ name: 'any' })
export class AnyPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value;
  }
}

import { AfterViewInit, Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[ngAfterViewInit]'
})
export class NgAfterViewInitDirective implements AfterViewInit {
  @Output('ngAfterViewInit') emitter: EventEmitter<void> = new EventEmitter();

  ngAfterViewInit(): void {
    this.emitter.emit();
  }
}

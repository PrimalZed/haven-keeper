import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Summon } from 'models/character';

@Component({
  selector: 'summon',
  templateUrl: './summon.component.html',
  styleUrls: ['./summon.component.scss']
})
export class SummonComponent {
  @Input() summon!: Summon;

  @Output() click: EventEmitter<void> = new EventEmitter();
  
  emitClick(event: MouseEvent) {
    event.stopPropagation();
    this.click.emit();
  }
}

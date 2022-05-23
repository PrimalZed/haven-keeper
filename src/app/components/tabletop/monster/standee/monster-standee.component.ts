import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MonsterStandee } from 'models/monster-set';

@Component({
  selector: 'monster-standee',
  templateUrl: 'monster-standee.component.html',
  styleUrls: ['monster-standee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterStandeeComponent {
  @Input() maxHitPoints!: number;
  @Input() standee!: MonsterStandee;

  @Output() click: EventEmitter<void> = new EventEmitter();
  
  emitClick(event: MouseEvent) {
    event.stopPropagation();
    this.click.emit();
  }
}

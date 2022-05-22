import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonsterStandee } from 'models/monster-set';

@Component({
  selector: 'monster-standee',
  templateUrl: 'monster-standee.component.html',
  styleUrls: ['monster-standee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterStandeeComponent {
  @Input() standee!: MonsterStandee;
}

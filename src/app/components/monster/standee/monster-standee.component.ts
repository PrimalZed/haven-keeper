import { Component, Input } from '@angular/core';
import { MonsterStandee } from 'models/monster-set';

@Component({
  selector: 'monster-standee',
  templateUrl: './monster-standee.component.html'
})
export class MonsterStandeeComponent {
  @Input() standee: MonsterStandee = {
    id: 0,
    rank: 'normal',
    hitPoints: 0,
    conditions: []
  }
}

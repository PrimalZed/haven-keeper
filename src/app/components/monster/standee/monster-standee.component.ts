import { Component, Input } from '@angular/core';
import { MonsterStandee } from 'src/app/models/monster-set';

@Component({
  selector: 'monster-standee',
  templateUrl: './monster-standee.component.html'
})
export class MonsterStandeeComponent {
  @Input() standee: MonsterStandee = {
    id: 0,
    rank: 'basic',
    hitPoints: 0,
    conditions: []
  }
}

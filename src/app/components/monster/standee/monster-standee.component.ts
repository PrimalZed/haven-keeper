import { Component } from '@angular/core';

@Component({
  selector: 'monster-standee',
  templateUrl: './monster-standee.component.html'
})
export class MonsterStandeeComponent {
  standee = 1;
  hitPoints = 5;
  rank: 'basic' | 'elite' | 'boss' = 'basic';
}

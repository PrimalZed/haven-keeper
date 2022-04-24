import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MonsterSet } from 'src/app/models/monster-set';

@Component({
  selector: 'tabletop',
  templateUrl: './tabletop.component.html',
  styleUrls: ['./tabletop.component.scss']
})
export class TabletopComponent {
  columns$ = this.breakpointObserver.observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(({ breakpoints }) => {
        if (breakpoints[Breakpoints.XLarge] || breakpoints[Breakpoints.Large] || breakpoints[Breakpoints.Medium]) {
          return 2;
        }
        else {
          return 1;
        }
      })
    );

  public cards: (MonsterSet & { kind: 'monster' })[] = [{
    kind: 'monster',
    key: 'placeholder',
    level: 0,
    standees: [{ id: 1, rank: 'basic', hitPoints: 6, conditions: [] }]
  },{
    kind: 'monster',
    key: 'placeholder',
    level: 0,
    standees: []
  },{
    kind: 'monster',
    key: 'placeholder',
    level: 0,
    standees: []
  }];

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
}

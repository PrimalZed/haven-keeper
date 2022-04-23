import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

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
  cards = [{ title: "First", rows: 2 }, { title: "Second", rows: 3 }, { title: "Third", rows: 1 }]

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { selectCards } from 'store/tabletop/cards.selector';

@Component({
  templateUrl: './tabletop.component.html',
  styleUrls: ['./tabletop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  public cards$ = this.store.select(selectCards);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) { }
}

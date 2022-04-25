import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MonsterSet } from 'models/monster-set';
import { AppState } from 'store/app.state';
import { selectCards } from 'store/tabletop/tabletop.selectors';
import { addMonster } from 'store/tabletop/tabletop.actions';

@Component({
  selector: 'tabletop',
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

  public cards$: Observable<(MonsterSet & { kind: 'monster' })[]> = this.store.select(selectCards);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) { }

  addMonster() {
    this.store.dispatch(addMonster({ key: 'cityGuard', level: 0 }));
  }
}

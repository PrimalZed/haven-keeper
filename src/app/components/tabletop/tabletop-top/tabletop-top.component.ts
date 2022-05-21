import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Element } from 'models/element';
import { map } from 'rxjs/operators';
import { TabletopService } from 'services/tabletop.service';
import { AppState } from 'store/app.state';
import { clearTabletop, infuseElement } from 'store/tabletop/tabletop.actions';
import { selectElementalInfusion, selectRound } from 'store/tabletop/tabletop.selectors';
import { redo, undo } from 'store/time-machine/time-machine.actions';
import { selectFuture, selectPast } from 'store/time-machine/time-machine.selectors';

@Component({
  selector: 'tabletop-top',
  styles: [
    `.svg-container { position: absolute; top: 0; bottom: 0; left: 0; right: 0; }`,
  ],
  templateUrl: './tabletop-top.component.html',
  animations: [
    trigger('elementalInfusion', [
      // ...
      state('inert', style({
        clipPath: 'inset(100% 0 0 0)'
      })),
      state('waning', style({
        clipPath: 'inset(50% 0 0 0)'
      })),
      state('strong', style({
        clipPath: 'inset(0 0 0 0)'
      })),
      transition('* => *', [
        animate('0.5s')
      ])
    ]),
    trigger('invertedElementalInfusion', [
      // ...
      state('inert', style({
        clipPath: 'inset(0 0 0 0)'
      })),
      state('waning', style({
        clipPath: 'inset(0 0 50% 0)'
      })),
      state('strong', style({
        clipPath: 'inset(0 0 100% 0)'
      })),
      transition('* => *', [
        animate('0.5s')
      ])
    ])
  ],
})
export class TabletopTopComponent {
  title = $localize`:@@title:Haven Keeper`;

  public elementalInfusions$ = this.store.select(selectElementalInfusion)
    .pipe(
      map((elementalInfusion) => Object.entries(elementalInfusion)
        .map(([element, strength]) => ({
          element: element as Element,
          strength
        }))
      )
    );

  public round$ = this.store.select(selectRound);

  public hasPast$ = this.store.select(selectPast)
    .pipe(
      map((past) => Boolean(past.length))
    );
  public hasFuture$ = this.store.select(selectFuture)
    .pipe(
      map((future) => Boolean(future.length))
    );

  constructor(private store: Store<AppState>, private tabletopService: TabletopService) { }

  undo() {
    this.tabletopService.dispatch(undo({ length: 1 }));
  }

  redo() {
    this.tabletopService.dispatch(redo({ length: 1 }));
  }

  trackElementalInfusion(index: number, { element }: { element: Element }) {
    return element
  }

  infuseElement(element: Element) {
    this.tabletopService.dispatch(infuseElement({ element }));
  }

  clearTabletop() {
   this.tabletopService.dispatch(clearTabletop()); 
  }
}

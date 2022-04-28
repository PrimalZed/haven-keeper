import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Card } from 'models/card';
import { CatalogService } from 'services/catalog.service';
import { AppState } from 'store/app.state';
import { selectCards } from 'store/tabletop/cards.selector';

@Component({
  templateUrl: './tabletop.component.html',
  styleUrls: ['./tabletop.component.scss'],
  animations: [
    trigger(
      'glideInOut',
      [
        transition(':enter', [style({ opacity: 0, transform: 'translateX(25%)' }), animate('500ms ease-out')]),
        transition(':leave', animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(25%)' }))),
      ]
    )
  ],
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

  public cards$ = this.store.select(selectCards)
    .pipe(
      map((cards) => cards
        .slice()
        .sort((a, b) => this.getInitiative(a) - this.getInitiative(b))
      )
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private catalogService: CatalogService,
    private store: Store<AppState>
  ) { }

  trackCard(index: number, card: Card) {
    return card.key;
  }

  private getInitiative(card: Card) {
    switch (card.kind) {
      case 'character':
        return card.initiative ?? 0;
      case 'monster':
        return card.currentAbilityCardId
          ? this.catalogService.monsterAbilityCardEntities[card.currentAbilityCardId].initiative
          : 0
    }
  }
}

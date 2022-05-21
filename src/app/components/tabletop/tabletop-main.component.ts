import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Card } from 'models/card';
import { MonsterAbilityDeck } from 'models/monster-ability-deck';
import { getAbilityDeckKey } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';
import { AppState } from 'store/app.state';
import { selectCards } from 'store/tabletop/cards.selector';

@Component({
  selector: 'tabletop-main',
  templateUrl: './tabletop-main.component.html',
  styleUrls: ['./tabletop-main.component.scss'],
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
export class TabletopMainComponent {
  public cards$ = this.store.select(selectCards)
    .pipe(
      map(({ cards, monsterAbilityDecks }) => cards
        .slice()
        .sort((a, b) => this.getInitiative(a, monsterAbilityDecks) - this.getInitiative(b, monsterAbilityDecks))
      )
    );

  constructor(
    private catalogService: CatalogService,
    private store: Store<AppState>
  ) { }

  trackCard(index: number, card: Card) {
    return card.key;
  }

  private getInitiative(card: Card, monsterAbilityDecks: Dictionary<MonsterAbilityDeck>) {
    switch (card.kind) {
      case 'character':
        return card.initiative ?? 0;
      case 'monster':
        const monster = this.catalogService.monsterEntities[card.key];
        const monsterAbilityDeck = monsterAbilityDecks[getAbilityDeckKey(monster)];

        return monsterAbilityDeck?.currentAbilityCardId
          ? this.catalogService.monsterAbilityCardEntities[monsterAbilityDeck.currentAbilityCardId].initiative
          : 0;
    }
  }
}

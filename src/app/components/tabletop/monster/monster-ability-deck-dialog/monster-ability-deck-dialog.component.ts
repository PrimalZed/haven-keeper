import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonsterAbilityDeck } from 'models/monster-ability-deck';
import { CatalogService } from 'services/catalog.service';

@Component({
  selector: 'app-monster-ability-deck-dialog',
  templateUrl: './monster-ability-deck-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterAbilityDeckDialogComponent {
  public abilityDeck: MonsterAbilityDeck = this.data.abilityDeck;

  public remainingCardIds = this.catalogService.monsterAbilityDecks[this.abilityDeck.key]
    .filter(x => !this.abilityDeck.drawnAbilityCardIds.includes(x.id))
    .map(x => x.id);

  public showRemainingCards: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { abilityDeck: MonsterAbilityDeck },
    private catalogService: CatalogService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  toggleRemainingVisibility() {
    this.showRemainingCards = !this.showRemainingCards;
    this.changeDetectorRef.markForCheck();
  }
}

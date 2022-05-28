import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BossStatCard, MonsterLevel } from 'models/monster-stat-card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { selectScenarioLevel } from 'store/tabletop/tabletop.selectors';

@Component({
  selector: 'boss-stat-card',
  templateUrl: './boss-stat-card.component.html',
  styleUrls: ['./boss-stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BossStatCardComponent {
  @Input() statCard!: BossStatCard;

  level$: Observable<MonsterLevel> = this.store.select(selectScenarioLevel)
    .pipe(
      map((level) => this.statCard.levels[level ?? 0])
    );

  specials$: Observable<{ 1: string, 2: string }> = this.store.select(selectScenarioLevel)
    .pipe(
      map((level) => this.statCard.specialLevels[level ?? 0])
    );

  constructor(private store: Store<AppState>) { }
}

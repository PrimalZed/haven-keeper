import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NormalMonsterStatCard, MonsterLevel } from 'models/monster-stat-card';
import { AppState } from 'store/app.state';
import { selectScenarioLevel } from 'store/tabletop/tabletop.selectors';

@Component({
  selector: 'monster-stat-card',
  templateUrl: './monster-stat-card.component.html',
  styleUrls: ['./monster-stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterStatCardComponent {
  @Input() statCard!: NormalMonsterStatCard;

  normalLevel$: Observable<MonsterLevel> = this.store.select(selectScenarioLevel)
    .pipe(
      map((level) => this.statCard.levels[level ?? 0])
    );

  eliteLevel$: Observable<MonsterLevel> = this.store.select(selectScenarioLevel)
    .pipe(
      map((level) => this.statCard.eliteLevels[level ?? 0])
    );

  constructor(private store: Store<AppState>) { }
}

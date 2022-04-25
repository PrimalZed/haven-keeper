import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MonsterSet } from 'models/monster-set';
import { MonsterStatCard } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';

@Component({
  selector: 'monster-set',
  templateUrl: './monster-set.component.html',
  styleUrls: ['./monster-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterSetComponent {
  private monsterSubject: Subject<MonsterSet> = new ReplaySubject(1);
  public monster$: Observable<MonsterSet> = this.monsterSubject.asObservable();
  @Input() public set monster(value: MonsterSet) {
    this.monsterSubject.next(value);
  }
  public statCard$: Observable<MonsterStatCard> = this.monster$
    .pipe(
      map(({ key }) => this.catalogService.monsterEntities[key])
    );

  public initiative = 53;

  constructor(private catalogService: CatalogService) { }
}

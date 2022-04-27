import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { MonsterSet } from 'models/monster-set';
import { MonsterStatCard } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';
import { AddStandeeDialogComponent } from './add-standee-dialog/add-standee-dialog.component';

@Component({
  selector: 'monster-set',
  templateUrl: './monster-set.component.html',
  styleUrls: ['./monster-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterSetComponent implements OnDestroy {
  private monsterSubject: Subject<MonsterSet> = new ReplaySubject(1);
  public monster$: Observable<MonsterSet> = this.monsterSubject.asObservable();
  @Input() public set monster(value: MonsterSet) {
    this.monsterSubject.next(value);
  }
  public statCard$: Observable<MonsterStatCard> = this.monster$
    .pipe(
      map(({ key }) => this.catalogService.monsterEntities[key])
    );

  public initiative$ = this.monster$
    .pipe(
      map(({ currentAbilityCardId }) => currentAbilityCardId
        ? this.catalogService.monsterAbilityCardEntities[currentAbilityCardId].initiative
        : null
      )
    );

  private openStandeeDialogSubject: Subject<void> = new Subject();
  private openStandeeDialog$ = this.openStandeeDialogSubject
    .pipe(
      withLatestFrom(this.monster$, (_, monster) => monster),
      map(({ key }) => this.dialog.open(AddStandeeDialogComponent, { data: { key } }))
    );

  private subscription = this.openStandeeDialog$.subscribe();

  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) { }

  openStandeeDialog() {
    this.openStandeeDialogSubject.next();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

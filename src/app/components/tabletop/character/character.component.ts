import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FigureDialogComponent } from 'components/tabletop/figure-dialog/figure-dialog.component';
import { Character, CharacterStatCard } from 'models/character';
import { merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CatalogService } from 'services/catalog.service';
import { AddSummonDialogComponent } from './add-summon-dialog/add-summon-dialog.component';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterComponent implements OnDestroy {
  private characterSubject: Subject<Character> = new ReplaySubject(1);
  public character$: Observable<Character> = this.characterSubject.asObservable();
  @Input() public set character(value: Character) {
    this.characterSubject.next(value);
  }
  public statCard$: Observable<CharacterStatCard> = this.character$
    .pipe(
      map(({ key }) => this.catalogService.characterEntities[key])
    );

  private openAddSummonDialogSubject: Subject<void> = new Subject();
  private openAddSummonDialog$ = this.openAddSummonDialogSubject
    .pipe(
      withLatestFrom(this.character$),
      map(([_, character]) => this.dialog.open(
        AddSummonDialogComponent,
        {
          data: { character }
        }
      ))
    );

  private openUpdateStatsDialogSubject: Subject<number> = new Subject();
  private openUpdateStatsDialog$ = this.openUpdateStatsDialogSubject
    .pipe(
      withLatestFrom(this.character$),
      map(([index, character]) => this.dialog.open(
        FigureDialogComponent,
        {
          data: {
            maxHitPoints: this.catalogService.characterEntities[character.key].hitPoints[index][character.level],
            kind: 'character',
            figure: {
              key: character.key,
              index,
              ...character.figures[index]
            }
          }
        }
      ))
    );

  private subscription = merge(
    this.openAddSummonDialog$,
    this.openUpdateStatsDialog$
  ).subscribe();
    
  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) { }

  addSummon() {
    this.openAddSummonDialogSubject.next();
  }

  openUpdateStatsDialog(index: number) {
    this.openUpdateStatsDialogSubject.next(index);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

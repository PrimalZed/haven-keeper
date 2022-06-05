import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FigureDialogComponent } from 'components/tabletop/figure-dialog/figure-dialog.component';
import { Character, CharacterStatCard } from 'models/character';
import { map, Observable, ReplaySubject, Subject, withLatestFrom } from 'rxjs';
import { CatalogService } from 'services/catalog.service';

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

  private subscription = this.openUpdateStatsDialog$.subscribe();
    
  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) { }

  openUpdateStatsDialog(index: number) {
    this.openUpdateStatsDialogSubject.next(index);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

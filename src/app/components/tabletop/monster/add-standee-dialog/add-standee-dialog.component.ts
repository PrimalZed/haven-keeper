import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TabletopService } from 'services/tabletop.service';
import { AppState } from 'store/app.state';
import { addMonsterStandee } from 'store/tabletop/monsters/monsters.actions';
import { selectMonsterEntities } from 'store/tabletop/monsters/monsters.selectors';

@Component({
  templateUrl: './add-standee-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddStandeeDialogComponent {
  public standees$ = this.store.select(selectMonsterEntities)
    .pipe(
      map((monsterEntities) => monsterEntities[this.data.key]),
      map((monster) => monster?.standees ?? []),
      map((usedStandees) => usedStandees.map(x => x.id)),
      map((usedIds) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map((id) => ({ id, used: usedIds.includes(id) }))
      )
    );

  public firstUnusedId$ = this.standees$
    .pipe(
      map((standees) => standees.find(x => !x.used)),
      map((firstUnusedStandee) => firstUnusedStandee?.id)
    );

  constructor(
    public dialogRef: MatDialogRef<AddStandeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { key: string },
    private store: Store<AppState>,
    private tabletopService: TabletopService
  ) { }

  submit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.tabletopService.dispatch(addMonsterStandee({
      key: this.data.key,
      ...form.value
    }));

    this.dialogRef.close();
  }
}

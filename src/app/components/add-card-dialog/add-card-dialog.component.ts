import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CatalogService } from 'services/catalog.service';
import { AppState } from 'store/app.state';
import { addMonster } from 'store/tabletop/monsters/monsters.actions';
import { selectMonsterKeys } from 'store/tabletop/monsters/monsters.selectors';

@Component({
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss']
})
export class AddCardDialogComponent {
  public monsters$ = this.store.select(selectMonsterKeys)
    .pipe(
      map((monsterKeys) => this.catalogService.monsters
        .map(({ key, name }) => ({
          key,
          name,
          used: monsterKeys.includes(key)
        }))
      )
    );

  constructor(
    private catalogService: CatalogService,
    public dialogRef: MatDialogRef<AddCardDialogComponent>,
    private store: Store<AppState>
  ) { }

  addMonster(key: string) {
    this.store.dispatch(addMonster({ key, level: 0 }));
    this.dialogRef.close();
  }
}

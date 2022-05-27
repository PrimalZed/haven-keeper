import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { selectCharacters } from 'store/tabletop/characters/characters.selectors';

@Component({
  selector: 'app-character-initiative-dialog',
  templateUrl: './character-initiative-dialog.component.html',
  styleUrls: ['./character-initiative-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterInitiativeDialogComponent {
  public characters$ = this.store.select(selectCharacters)
    .pipe(
      map((characters) => characters
        .filter((character) => character.hitPoints)
      )
    );

  constructor(
    private dialogRef: MatDialogRef<CharacterInitiativeDialogComponent, boolean>,
    private store: Store<AppState>
  ) { }

  submit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.dialogRef.close(form.value);
  }
}

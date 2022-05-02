import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'store/app.state';
import { selectCharacterKeys } from 'store/tabletop/characters/characters.selectors';

@Component({
  selector: 'app-character-initiative-dialog',
  templateUrl: './character-initiative-dialog.component.html',
  styleUrls: ['./character-initiative-dialog.component.scss']
})
export class CharacterInitiativeDialogComponent {
  public characterKeys$ = this.store.select(selectCharacterKeys);

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

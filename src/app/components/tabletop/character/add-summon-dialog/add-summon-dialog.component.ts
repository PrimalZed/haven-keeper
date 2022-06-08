import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character, SummonColor } from 'models/character';
import { TabletopService } from 'services/tabletop.service';
import { addCharacterSummon } from 'store/tabletop/characters/characters.actions';

@Component({
  selector: 'app-add-summon-dialog',
  templateUrl: './add-summon-dialog.component.html',
  styleUrls: ['./add-summon-dialog.component.scss']
})
export class AddSummonDialogComponent {
  private character = this.data.character;
  public tokens = (['blue', 'green', 'yellow', 'orange', 'white', 'violet', 'magenta', 'red'] as SummonColor[])
    .map((color) => ({
      color,
      used: this.character.summons.some(x => x.color === color)
    }));

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { character: Character },
    private tabletopService: TabletopService
  ) { }

  submit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.tabletopService.dispatch(addCharacterSummon({
      key: this.character.key,
      ...form.value
    }));
  }
}

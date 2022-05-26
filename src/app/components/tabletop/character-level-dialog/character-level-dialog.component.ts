import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CharacterLevel } from 'models/character';

@Component({
  templateUrl: './character-level-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterLevelDialogComponent {
  public levels: CharacterLevel[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  constructor(
    private dialogRef: MatDialogRef<CharacterLevelDialogComponent, { success: boolean, level: CharacterLevel }>
  ) { }

  selectCharacterLevel(level: CharacterLevel) {
    this.dialogRef.close({ success: true, level });
  }
}

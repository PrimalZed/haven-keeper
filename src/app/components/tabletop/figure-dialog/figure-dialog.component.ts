import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from 'models/character';
import { ConditionKey, conditions } from 'models/condition';
import { MonsterStandee } from 'models/monster-set';
import { MonsterStatCard } from 'models/monster-stat-card';
import { TabletopService } from 'services/tabletop.service';
import { updateCharacter } from 'store/tabletop/characters/characters.actions';
import { removeMonsterStandee, updateMonsterStandee } from 'store/tabletop/monsters/monsters.actions';

@Component({
  templateUrl: './figure-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FigureDialogComponent {
  public key: string = (() => {
    switch (this.data.kind) {
      case 'character':
        return this.data.figure.key;
      case 'monster':
        return this.data.statCard.key;
    }
  })();
  public name: string | null = (() => {
    switch (this.data.kind) {
      case 'character':
        return null;
      case 'monster':
        return this.data.statCard.name;
    }
  })();
  public maxHitPoints: number = this.data.maxHitPoints;
  public kind: 'character' | 'monster' = this.data.kind;
  public figure: Character | MonsterStandee = this.data.figure;
  public conditions: { key: ConditionKey, active: boolean }[] = conditions
    .filter((key) => !['bless', 'curse'].includes(key))
    .map((key) => ({
      key,
      active: this.figure.conditions.includes(key)
    }));

  constructor(
    private dialogRef: MatDialogRef<FigureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      maxHitPoints: number,
    } & ({ kind: 'character', figure: Character } | { kind: 'monster', statCard: MonsterStatCard, figure: MonsterStandee }),
    private tabletopService: TabletopService
  ) { }

  submit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    const formValue: { hitPoints: number, conditions: { [key in ConditionKey]: boolean } } = form.getRawValue();
    const updateStatsProps = {
      hitPoints: formValue.hitPoints,
      conditions: Object.entries(formValue.conditions)
        .filter(([condition, active]) => active)
        .map(([condition, active]) => condition as ConditionKey)
    };

    switch (this.data.kind) {
      case 'character':
        this.tabletopService.dispatch(updateCharacter({ key: this.key, ...updateStatsProps }));
        break;
      case 'monster':
        this.tabletopService.dispatch(updateMonsterStandee({ key: this.key, id: this.data.figure.id, ...updateStatsProps }));
        break;
    }

    this.dialogRef.close();
  }

  remove() {
    if (this.data.kind !== 'monster') {
      return;
    }

    this.tabletopService.dispatch(removeMonsterStandee({ key: this.data.statCard.key, id: this.data.figure.id }));
    this.dialogRef.close();
  }
}

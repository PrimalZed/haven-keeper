import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConditionKey, conditions } from 'models/condition';
import { MonsterStandee } from 'models/monster-set';
import { MonsterStatCard } from 'models/monster-stat-card';
import { TabletopService } from 'services/tabletop.service';
import { AppState } from 'store/app.state';
import { updateMonsterStandee } from 'store/tabletop/monsters/monsters.actions';
import { selectScenarioLevel } from 'store/tabletop/tabletop.selectors';

@Component({
  templateUrl: './monster-standee-dialog.component.html',
  styleUrls: ['./monster-standee-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonsterStandeeDialogComponent {
  public statCard: MonsterStatCard = this.data.statCard;
  public standee: MonsterStandee = this.data.standee;
  public conditions: { key: ConditionKey, active: boolean }[] = conditions
    .filter((key) => !['bless', 'curse'].includes(key))
    .map((key) => ({
      key,
      active: this.standee.conditions.includes(key)
    }));

  public scenarioLevel$ = this.store.select(selectScenarioLevel);

  constructor(
    private dialogRef: MatDialogRef<MonsterStandeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { statCard: MonsterStatCard, maxHitPoints: number, standee: MonsterStandee },
    private store: Store<AppState>,
    private tabletopService: TabletopService
  ) { }

  submit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    const formValue: { hitPoints: number, conditions: { [key in ConditionKey]: boolean } } = form.getRawValue();
    const updateMonsterStandeeProps = {
      hitPoints: formValue.hitPoints,
      conditions: Object.entries(formValue.conditions)
        .filter(([condition, active]) => active)
        .map(([condition, active]) => condition as ConditionKey)
    };
    this.tabletopService.dispatch(updateMonsterStandee({ key: this.statCard.key, id: this.standee.id, ...updateMonsterStandeeProps }));
    this.dialogRef.close();
  }
}

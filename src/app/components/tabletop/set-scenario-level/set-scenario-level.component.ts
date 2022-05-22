import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScenarioLevel } from 'models/scenario-level';
import { TabletopService } from 'services/tabletop.service';
import { setScenarioLevel } from 'store/tabletop/tabletop.actions';

@Component({
  selector: 'app-set-scenario-level',
  templateUrl: './set-scenario-level.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetScenarioLevelComponent {

  public levels: ScenarioLevel[] = [
    0, 1, 2, 3, 4, 5, 6, 7
  ];

  constructor(
    private dialogRef: MatDialogRef<SetScenarioLevelComponent, { success: boolean }>,
    private tabletopService: TabletopService
  ) { }

  setScenarioLevel(level: ScenarioLevel) {
    this.tabletopService.dispatch(setScenarioLevel({ level }));
    this.dialogRef.close({ success: true });
  }
}

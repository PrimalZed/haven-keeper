import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'character-icon',
  templateUrl: './character-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterIconComponent {
  @Input() key!: string;
}

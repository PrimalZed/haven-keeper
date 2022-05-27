import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'character-icon',
  templateUrl: './character-icon.component.html',
  styles: [`:host { display: inline-flex; justify-content: center; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterIconComponent {
  @Input() key!: string;

  @Input() size: 'md' | 'lg' = 'md';

  @Input() shadow: boolean = true;
}

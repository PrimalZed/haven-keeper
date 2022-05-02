import { Component, Input } from '@angular/core';
import { Character, CharacterStatCard } from 'models/character';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import { CatalogService } from 'services/catalog.service';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {
  private characterSubject: Subject<Character> = new ReplaySubject(1);
  public character$: Observable<Character> = this.characterSubject.asObservable();
  @Input() public set character(value: Character) {
    this.characterSubject.next(value);
  }
  public statCard$: Observable<CharacterStatCard> = this.character$
    .pipe(
      map(({ key }) => this.catalogService.characterEntities[key])
    );
    
  constructor(
    private catalogService: CatalogService
  ) { }
}

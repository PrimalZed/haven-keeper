import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, merge, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from 'models/character';
import { MonsterAbilityCard } from 'models/monster-ability-card';
import { MonsterStatCard } from 'models/monster-stat-card';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  characters: Character[] = [];
  monsters: MonsterStatCard[] = [];
  monsterAbilityCards: { [key: string]: MonsterAbilityCard[] } = { };

  get characterEntities(): { [key: string]: Character } {
    return this.characters
      .reduce(
        (acc, character) => ({
          ...acc,
          [character.key]: character
        }),
        { }
      );
  }

  get monsterEntities(): { [key: string]: MonsterStatCard } {
    return this.monsters
      .reduce(
        (acc, monster) => ({
          ...acc,
          [monster.key]: monster
        }),
        { }
      );
  }

  get monsterAbilityCardEntities(): { [id: number]: MonsterAbilityCard } {
    return Object.values<MonsterAbilityCard[]>(this.monsterAbilityCards)
      .flatMap(x => x)
      .reduce(
        (acc, card): { [id: number]: MonsterAbilityCard } => ({
          ...acc,
          [card.id]: card
        }),
        { }
      );
  }

  constructor(private http: HttpClient) { }

  initialize(): Promise<void> {
    const loadCharacters$ = this.http.get<Character[]>(`${environment.basePath}/assets/data/characters.json`)
      .pipe(
        tap((characters) => {
          this.characters = characters;
        }),
        map((): void => void(0))
      );

    const loadMonsters$ = this.http.get<MonsterStatCard[]>(`${environment.basePath}/assets/data/monsters.json`)
      .pipe(
        tap((monsters) => {
          this.monsters = monsters;
        }),
        map((): void => void(0))
      );

    const loadMonsterCards$ = this.http.get<{ [key: string]: MonsterAbilityCard[] }>(`${environment.basePath}/assets/data/monster-ability-cards.json`)
      .pipe(
        tap((monsterAbilityCards) => {
          this.monsterAbilityCards = monsterAbilityCards;
        }),
        map((): void => void(0))
      );
    
    return lastValueFrom(merge(
      loadCharacters$,
      loadMonsters$,
      loadMonsterCards$
    ));
  }
}

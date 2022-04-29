import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, merge, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharacterStatCard } from 'models/character';
import { MonsterAbilityCard } from 'models/monster-ability-card';
import { MonsterStatCard } from 'models/monster-stat-card';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  characters: CharacterStatCard[] = [];
  monsters: MonsterStatCard[] = [];
  monsterAbilityCards: { [key: string]: MonsterAbilityCard[] } = { };

  get characterEntities(): { [key: string]: CharacterStatCard } {
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

  initialize(): Observable<void> {
    const loadCharacters$ = this.http.get<CharacterStatCard[]>(`${environment.basePath}/assets/data/characters.json`)
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
    
    return merge(
      loadCharacters$,
      loadMonsters$,
      loadMonsterCards$
    );
  }
}

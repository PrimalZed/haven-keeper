import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, merge, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MonsterAbilityCard } from 'models/monster-ability-card';
import { MonsterStatCard } from 'models/monster-stat-card';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  monsters: MonsterStatCard[] = [];
  monsterAbilityCards: { [key: string]: MonsterAbilityCard[] } = { };

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

  constructor(private http: HttpClient) { }

  initialize(): Promise<void> {
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
    
    return lastValueFrom(merge(loadMonsters$, loadMonsterCards$));
  }
}

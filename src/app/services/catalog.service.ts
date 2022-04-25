import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MonsterStatCard } from 'models/monster-stat-card';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  monsters: MonsterStatCard[] = [];

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
    
    return firstValueFrom(loadMonsters$);
  }
}

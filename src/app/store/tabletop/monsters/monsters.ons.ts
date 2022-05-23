import { on } from '@ngrx/store';
import { getAbilityDeckKey } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';
import { monsterAbilityDecksAdapter } from '../monster-ability-decks/monster-ability-decks.adapter';
import { TabletopState } from '../tabletop.state';
import { addMonster, addMonsterStandee, undoAddMonster, undoAddMonsterStandee, undoUpdateMonsterStandee, updateMonsterStandee } from './monsters.actions';
import { monstersAdapter } from './monsters.adapter';

export function getMonstersOns(catalogService: CatalogService) {
  return [
    on<TabletopState, [typeof addMonster]>(addMonster, (state, { key }) => ({
      ...state,
      monsters: monstersAdapter.addOne({
        key,
        standees: []
      }, state.monsters),
      monsterAbilityDecks: monsterAbilityDecksAdapter.addOne({
        key: getAbilityDeckKey(catalogService.monsterEntities[key]),
        currentAbilityCardId: null,
        drawnAbilityCardIds: []
      }, state.monsterAbilityDecks)
    })),
    on<TabletopState, [typeof undoAddMonster]>(undoAddMonster, (state, { key }) => ({
      ...state,
      monsters: monstersAdapter.removeOne(key, state.monsters)
    })),
    on<TabletopState, [typeof addMonsterStandee]>(addMonsterStandee, (state, { key, id, rank }) => ({
      ...state,
      monsters: monstersAdapter.mapOne({
        id: key,
        map: (x) => ({
          ...x,
          standees: [
            ...x.standees,
            {
              id,
              rank,
              hitPoints: (() => {
                const statCard = catalogService.monsterEntities[x.key];
                switch (rank) {
                  case 'elite':
                    if (statCard.kind === 'boss') {
                      throw 'Can\'t add elite standee for boss';
                    }
                    return statCard.eliteLevels[state.level ?? 0].hitPoints;
                  case 'normal':
                    return statCard.levels[state.level ?? 0].hitPoints;
                } 
              })(),
              conditions: [] }
          ]
        })
      }, state.monsters)
    })),
    on<TabletopState, [typeof undoAddMonsterStandee]>(undoAddMonsterStandee, (state, { key, id }) => ({
      ...state,
      monsters: monstersAdapter.mapOne({
        id: key,
        map: (x) => ({
          ...x,
          standees: x.standees.filter((y) => y.id !== id)
        })
      }, state.monsters)
    })),
    on<TabletopState, [typeof updateMonsterStandee]>(updateMonsterStandee, (state, { key, id, hitPoints, conditions }) => ({
      ...state,
      monsters: monstersAdapter.mapOne({
        id: key,
        map: (x) => ({
          ...x,
          standees: x.standees.map((y) => y.id === id ? { ...y, hitPoints, conditions } : y)
        })
      }, state.monsters)
    })),
    on<TabletopState, [typeof undoUpdateMonsterStandee]>(undoUpdateMonsterStandee, (state, { key, id, previousHitPoints, previousConditions }) => ({
      ...state,
      monsters: monstersAdapter.mapOne({
        id: key,
        map: (x) => ({
          ...x,
          standees: x.standees.map((y) => y.id === id ? { ...y, hitPoints: previousHitPoints, conditions: previousConditions } : y)
        })
      }, state.monsters)
    }))
  ];
}

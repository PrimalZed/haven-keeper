import { on } from '@ngrx/store';
import { getAbilityDeckKey } from 'models/monster-stat-card';
import { CatalogService } from 'services/catalog.service';
import { monsterAbilityDecksAdapter } from '../monster-ability-decks/monster-ability-decks.adapter';
import { TabletopState } from '../tabletop.state';
import { addMonster, addMonsterStandee, undoAddMonster, undoAddMonsterStandee } from './monsters.actions';
import { monstersAdapter } from './monsters.adapter';

export function getMonstersOns(catalogService: CatalogService) {
  return [
    on<TabletopState, [typeof addMonster]>(addMonster, (state, { key, level }) => ({
      ...state,
      monsters: monstersAdapter.addOne({
        key,
        level,
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
            { id, rank, hitPoints: 5, conditions: [] }
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
    }))
  ];
}

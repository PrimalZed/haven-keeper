import { createReducer, on } from '@ngrx/store';
import { ElementalInfusion } from 'models/element';
import { monstersAdapter } from './monsters.adapter';
import {
    addMonster,
    addMonsterStandee,
    drawMonsterAbilityCardsSuccess, 
    infuseElement, 
    nextRound, 
    undoAddMonster,
    undoAddMonsterStandee, 
    undoDrawMonsterAbilityCards,
    undoInfuseElement,
    undoNextRound
} from './tabletop.actions';
import { TabletopState } from './tabletop.state';

export const initialTabletopState: TabletopState = {
    step: 'card-selection',
    round: 1,
    elementalInfusion: {
        'fire': 'inert',
        'ice': 'inert',
        'air': 'inert',
        'earth': 'inert',
        'light': 'inert',
        'dark': 'inert'
    },
    monsters: monstersAdapter.getInitialState()
};

export const tabletopReducer = createReducer<TabletopState>(
    initialTabletopState,
    on(addMonster, (state, { key, level }) => ({
        ...state,
        monsters: monstersAdapter.addOne({
            key,
            level,
            standees: [],
            currentAbilityCardId: null,
            drawnAbilityCardIds: []
        }, state.monsters)
    })),
    on(undoAddMonster, (state, { key }) => ({
        ...state,
        monsters: monstersAdapter.removeOne(key, state.monsters)
    })),
    on(addMonsterStandee, (state, { key, id, rank }) => ({
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
    on(undoAddMonsterStandee, (state, { key, id }) => ({
        ...state,
        monsters: monstersAdapter.mapOne({
            id: key,
            map: (x) => ({
                ...x,
                standees: x.standees.filter((y) => y.id !== id)
            })
        }, state.monsters)
    })),
    on(drawMonsterAbilityCardsSuccess, (state, { abilityCardIds }) => ({
        ...state,
        step: 'actions',
        monsters: monstersAdapter.map((monster) => ({
            ...monster,
            currentAbilityCardId: abilityCardIds[monster.key],
            drawnAbilityCardIds: [
                ...monster.drawnAbilityCardIds,
                abilityCardIds[monster.key]
            ]
        }), state.monsters)
    })),
    on(undoDrawMonsterAbilityCards, (state, { abilityCardIds }) => ({
        ...state,
        step: 'card-selection',
        monsters: monstersAdapter.map((monster) => ({
            ...monster,
            currentAbilityCardId: abilityCardIds[monster.key].previousId,
            drawnAbilityCardIds: monster.drawnAbilityCardIds
                .filter((id) => id !== abilityCardIds[monster.key].nextId)
        }), state.monsters)
    })),
    on(infuseElement, (state, { element }) => ({
        ...state,
        elementalInfusion: {
            ...state.elementalInfusion,
            [element]: ((startingInfusion: ElementalInfusion): ElementalInfusion => {
                switch (startingInfusion) {
                    case 'strong':
                        return 'waning';
                    case 'waning':
                        return 'inert';
                    case 'inert':
                        return 'strong';
                }
            })(state.elementalInfusion[element])
        }
    })),
    on(undoInfuseElement, (state, { element }) => ({
        ...state,
        elementalInfusion: {
            ...state.elementalInfusion,
            [element]: ((startingInfusion: ElementalInfusion): ElementalInfusion => {
                switch (startingInfusion) {
                    case 'strong':
                        return 'inert';
                    case 'waning':
                        return 'strong';
                    case 'inert':
                        return 'waning';
                }
            })(state.elementalInfusion[element])
        }
    })),
    on(nextRound, (state) => ({
        ...state,
        step: 'card-selection',
        round: state.round + 1,
        elementalInfusion: {
            'fire': state.elementalInfusion['fire'] === 'strong' ? 'waning' : 'inert',
            'ice': state.elementalInfusion['ice'] === 'strong' ? 'waning' : 'inert',
            'air': state.elementalInfusion['air'] === 'strong' ? 'waning' : 'inert',
            'earth': state.elementalInfusion['earth'] === 'strong' ? 'waning' : 'inert',
            'light': state.elementalInfusion['light'] === 'strong' ? 'waning' : 'inert',
            'dark': state.elementalInfusion['dark'] === 'strong' ? 'waning' : 'inert'
        },
        monsters: monstersAdapter.map((monster) => ({
            ...monster,
            currentAbilityCardId: null
        }), state.monsters)
    })),
    on(undoNextRound, (state, { abilityCardIds, elementalInfusion }) => ({
        ...state,
        step: 'actions',
        round: state.round - 1,
        elementalInfusion: { ...elementalInfusion },
        monsters: monstersAdapter.map((monster) => ({
            ...monster,
            currentAbilityCardId: abilityCardIds[monster.key]
        }), state.monsters)
    }))
);

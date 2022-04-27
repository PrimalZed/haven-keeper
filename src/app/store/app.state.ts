import { TabletopState } from './tabletop/tabletop.state';
import { TimeMachineState } from './time-machine/time-machine.state';

export interface AppState {
    tabletop: TabletopState;
    timeMachine: TimeMachineState
}

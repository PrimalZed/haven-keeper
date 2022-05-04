import { P2pState } from './p2p/p2p-state';
import { TabletopState } from './tabletop/tabletop.state';
import { TimeMachineState } from './time-machine/time-machine.state';

export interface AppState {
    p2p: P2pState;
    tabletop: TabletopState;
    timeMachine: TimeMachineState
}

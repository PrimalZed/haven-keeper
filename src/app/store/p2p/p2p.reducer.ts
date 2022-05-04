import { createReducer, on } from '@ngrx/store';
import { P2pState } from './p2p-state';
import { chooseRole, receiveHostOfferSuccess, startGuestConnectionSuccess } from './p2p.actions';

const initialP2PState: P2pState = {
  role: null
};

export const p2pReducer = createReducer<P2pState>(
  initialP2PState,
  on(chooseRole, (state, { role }) => {
    switch (role) {
      case 'host':
        return {
          role: 'host',
          guestConnectionSets: []
        };
      case 'guest':
        return {
          role: 'guest',
          hostConnection: null
        }
    }
  }),
  on(startGuestConnectionSuccess, (state, { connection, channel }) => ({
    ...state,
    ...state.role === 'host'
      ? { guestConnectionSets:  [...state.guestConnectionSets, { connection, channel }] }
      : { }
  })),
  on(receiveHostOfferSuccess, (state, { connection, answer }) => ({
    role: 'guest',
    hostConnection: connection,
    answer
  }))
);

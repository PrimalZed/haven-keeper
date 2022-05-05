import { createReducer, on } from '@ngrx/store';
import { P2pState } from './p2p-state';
import {
  chooseRole,
  closeAllConnectionsSuccess,
  closeConnectionSuccess,
  guestChannelSuccess,
  guestDisconnected,
  hostDisconnected,
  receiveHostOfferSuccess,
  startGuestConnectionSuccess
} from './p2p.actions';

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
          connection: null,
          channel: null
        }
    }
  }),
  on(startGuestConnectionSuccess, (state, { connection, channel }) => ({
    ...state,
    ...state.role === 'host'
      ? { guestConnectionSets:  [...state.guestConnectionSets, { connection, channel }] }
      : { }
  })),
  on(receiveHostOfferSuccess, (state, { connection }) => ({
    role: 'guest',
    connection: connection,
    channel: null
  })),
  on(guestChannelSuccess, (state, { channel }) => ({
    ...state,
    ...state.role === 'guest'
      ? { channel }
      : { }
  })),
  on(closeConnectionSuccess, (state, { index }) => ({
    ...state,
    ...state.role === 'host'
      ? {
        guestConnectionSets: state.guestConnectionSets
          .filter((_, connectionIndex) => connectionIndex !== index)
      }
      : { }
  })),
  on(closeAllConnectionsSuccess, (state) => ({
    role: null
  })),
  on(guestDisconnected, (state, { remoteDescription }) => ({
    ...state,
    ...state.role === 'host'
      ? {
        guestConnectionSets: state.guestConnectionSets
          .filter((connection) => connection.connection.currentRemoteDescription?.sdp !== remoteDescription)
      }
      : { }
  })),
  on(hostDisconnected, (state) => ({
    ...state,
    ...state.role === 'guest'
      ? {
        connection: null,
        channel: null
      }
      : { }
  }))
);

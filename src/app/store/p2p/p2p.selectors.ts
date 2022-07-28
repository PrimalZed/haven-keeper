import { createFeatureSelector, createSelector } from '@ngrx/store';
import { P2pState } from './p2p-state';

export const selectP2pState = createFeatureSelector<P2pState>('p2p');

export const selectP2pRole = createSelector(
  selectP2pState,
  (state) => state.role
);

export const selectHostP2pState = createSelector(
  selectP2pState,
  (state) => state.role === 'host'
    ? state
    : null
);

export type GuestConnection =
  | { state: 'connected', name: string | undefined }
  | { state: 'pending', name: string | undefined, offer: string | undefined };
export const selectHostGuests = createSelector(
  selectHostP2pState,
  (state) => state?.guestConnectionSets
    .map((x): GuestConnection => x.connection.iceConnectionState === 'connected'
      ? {
        state: 'connected',
        name: x.name
      }
      : {
        state: 'pending',
        offer: x.connection.pendingLocalDescription?.sdp,
        name: x.name
      }
    )
    ?? []
);

export const selectHostGuestConnections = createSelector(
  selectHostP2pState,
  (state) => state?.guestConnectionSets ?? []
);

export const selectGuestP2pState = createSelector(
  selectP2pState,
  (state) => state.role === 'guest'
    ? state
    : null
);

export const selectGuestAnswer = createSelector(
  selectGuestP2pState,
  (state) => state?.connection?.currentLocalDescription?.sdp
);

export const selectGuestChannel = createSelector(
  selectGuestP2pState,
  (state) => state?.channel
);

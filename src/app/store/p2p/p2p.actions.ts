import { createAction, props } from '@ngrx/store';

export const chooseRole = createAction(
  '[P2P] Choose Role',
  props<{ role: 'host' | 'guest' }>()
);

export const startGuestConnection = createAction(
  '[P2P] Start Guest Connection'
);

export const startGuestConnectionSuccess = createAction(
  '[P2P] Start Guest Connection Success',
  props<{ connection: RTCPeerConnection, channel: RTCDataChannel }>()
);

export const receiveGuestAnswer = createAction(
  '[P2P] Receive Guest Answer',
  props<{ index: number, answer: string }>()
);

export const guestDisconnected = createAction(
  '[P2P] Guest Disconnected',
  props<{ remoteDescription: string }>()
);

export const receiveHostOffer = createAction(
  '[P2P] Receive Host Offer',
  props<{ offer: string }>()
);

export const receiveHostOfferSuccess = createAction(
  '[P2P] Receive Host Offer Success',
  props<{ connection: RTCPeerConnection }>()
);

export const guestChannelSuccess = createAction(
  '[P2P] Guest Channel Success',
  props<{ channel: RTCDataChannel }>()
);

export const hostDisconnected = createAction(
  '[P2P] Host Disconnected'
);

export const closeConnection = createAction(
  '[P2P] Close Connection',
  props<{ index: number }>()
);

export const closeConnectionSuccess = createAction(
  '[P2P] Close Connection Success',
  props<{ index: number }>()
);

export const leave = createAction(
  '[P2P] Leave'
);

export const closeAllConnectionsSuccess = createAction(
  '[P2P] Close All Connections Success'
);

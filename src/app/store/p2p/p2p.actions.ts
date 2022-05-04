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

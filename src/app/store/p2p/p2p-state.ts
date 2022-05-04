export interface NoP2pState {
  role: null;
}

export interface HostP2pState {
  role: 'host';
  guestConnectionSets:  { connection: RTCPeerConnection, channel: RTCDataChannel }[];
}

export interface GuestP2pState {
  role: 'guest';
  hostConnection: RTCPeerConnection | null;
}

export type P2pState =
  | NoP2pState
  | HostP2pState
  | GuestP2pState;

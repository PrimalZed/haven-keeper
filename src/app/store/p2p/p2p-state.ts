export interface NoP2pState {
  role: null;
}

export interface HostP2pState {
  role: 'host';
  guestConnectionSets:  { name?: string | undefined, connection: RTCPeerConnection, channel: RTCDataChannel }[];
}

export interface GuestP2pState {
  role: 'guest';
  connection: RTCPeerConnection | null;
  channel: RTCDataChannel | null;
}

export type P2pState =
  | NoP2pState
  | HostP2pState
  | GuestP2pState;

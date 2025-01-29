export const ADD_PEER = "ADD_PEER";
export const REMOVE_PEER = "REMOVE_PEER";

export const addPeerAction = (peerID, stream) => ({
  type: ADD_PEER,
  payload: { peerID, stream },
});

export const removePeerAction = (peerID) => ({
  type: REMOVE_PEER,
  payload: { peerID },
});

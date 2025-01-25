export const ADD_PEER = "ADD_PEER";
export const REMOVE_PEER = "REMOVE_PEER";

export const addPeerAction = (peerID, stream) => {
  return {
    type: ADD_PEER,
    payload: { peerID, stream },
  };
};

export const removePeerAction = (peerID) => {
  return {
    type: REMOVE_PEER,
    action: { peerID },
  };
};

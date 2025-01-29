import { ADD_PEER, REMOVE_PEER } from "../Actions/peerAction";

export const peerReducer = (state, action) => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerID]: { stream: action.payload.stream },
      };
    case REMOVE_PEER:
      const { [action.payload.peerID]: removedPeer, ...remainingPeers } = state;
      console.log(remainingPeers);
      return remainingPeers;
    default:
      return { ...state };
  }
};

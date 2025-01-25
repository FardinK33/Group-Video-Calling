import { ADD_PEER, REMOVE_PEER } from "../Actions/peerAction";

const initial_state = {};

export const peerReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peedID]: { stream: action.payload.stream },
      };
    case REMOVE_PEER:
      const { [action.payload.peerID]: removedPeer, ...remainingPeers } = state;
      return remainingPeers;
    default:
      return state;
  }
};

import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import UserFeedPlayer from "../components/user-feed-player";

const Room = () => {
  const { socket, user, stream, peers } = useSocketContext();
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      socket.emit("joined-room", { roomID: id, peerID: user._id });
    }
  }, [id, socket, user]);

  return (
    <div className="bg-slate-900 text-gray-300 h-screen">
      room : {id}
      <p>Our Own Feed</p>
      <UserFeedPlayer stream={stream} />
      <br />
      <div>
        Other Users Feed
        {Object.keys(peers).map((peerID) => (
          <UserFeedPlayer key={peerID} stream={peers[peerID].stream} />
        ))}
      </div>
    </div>
  );
};

export default Room;

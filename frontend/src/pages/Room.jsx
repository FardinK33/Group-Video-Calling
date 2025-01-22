import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import UserFeedPlayer from "../components/user-feed-player";

const Room = () => {
  const { socket, user, stream, userMediaStream } = useSocketContext();
  const { id } = useParams();

  useEffect(() => {
    userMediaStream();
    if (socket && user) {
      socket.emit("joined-room", { roomID: id, peerID: user._id });
    }
  }, [id, socket, user]);

  return (
    <div className="bg-slate-900 text-gray-300 h-screen">
      <UserFeedPlayer stream={stream} />
    </div>
  );
};

export default Room;

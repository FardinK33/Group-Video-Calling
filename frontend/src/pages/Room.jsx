import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useParams } from "react-router-dom";
import UserFeedPlayer from "../components/user-feed-player";
import ChatBox from "../components/ChatComponent";

const Room = () => {
  const { socket, user, stream, peers } = useSocketContext();
  const { id } = useParams();

  const getGridClass = () => {
    if (peers && Object.keys(peers).length < 2)
      return "grid-cols-1 md:grid-cols-2";
    // if (peers && Object.keys(peers).length < 3) return "grid-cols-3";
    return "grid-cols-2 gird-rows-2";
  };

  useEffect(() => {
    if (user) {
      socket.emit("joined-room", { roomID: id, peerID: user._id });
    }
  }, [id, socket, user]);

  return (
    <div className="bg-slate-800 text-gray-300 h-screen flex">
      <div className={`grid ${getGridClass()} gap-4 p-4 min-h-screen flex-1`}>
        {/* room : {id}
        <p>Our Own Feed</p> */}
        <div className="relative">
          <UserFeedPlayer stream={stream} />
        </div>
        {/* Other Users Feed */}
        {Object.keys(peers).map((peerID) => (
          <div key={peerID}>
            <UserFeedPlayer stream={peers[peerID].stream} />
          </div>
        ))}
      </div>
      <div className="w-[20%]">
        <ChatBox socket={socket} />
      </div>
    </div>
  );
};

export default Room;

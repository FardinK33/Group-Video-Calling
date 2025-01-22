import React from "react";
import { useSocketContext } from "../context/SocketContext";

const Home = () => {
  const { socket } = useSocketContext();

  const createRoom = () => {
    socket.emit("create-room");
  };

  return (
    <div className="h-screen bg-slate-900 flex justify-center items-center text-gray-300">
      <button className="p-4 rounded-xl bg-black" onClick={createRoom}>
        Create a Room
      </button>
    </div>
  );
};

export default Home;

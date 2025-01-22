import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as UUIDv4 } from "uuid";
import { Peer } from "peerjs";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const socket = io.connect("http://localhost:3000");

const SocketProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();

  const userMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
    } catch (err) {
      console.error("Error in Collecting Media Stream : ", err);
    }
  };

  useEffect(() => {
    socket.on("room-created", (roomID) => {
      console.log("joined-room");
      navigate(`/room/${roomID}`);
    });

    const userID = UUIDv4();
    const user = new Peer(userID);
    setUser(user);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, user, stream, userMediaStream }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

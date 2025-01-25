import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as UUIDv4 } from "uuid";
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction } from "../Actions/peerAction";

const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const socket = io.connect("http://localhost:3000");

const SocketProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();

  const [peers, dispatch] = useReducer(peerReducer, {});

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

  useEffect(() => {
    if (!user || !stream) return;

    socket.on("user-joined", ({ peerID }) => {
      // Calling the new user
      const call = user.call(peerID, stream);
      call.on("stream", (stream) => {
        dispatch(addPeerAction(peerID, stream));
      });
    });

    user.on("call", (call) => {
      // receiving the call and answering with our stream
      call.answer(stream);
      call.on("stream", (stream) => {
        dispatch(addPeerAction(call.peer, stream));
      });
    });

    socket.emit("ready");
  }, [user, stream]);

  return (
    <SocketContext.Provider
      value={{ socket, user, stream, userMediaStream, peers }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

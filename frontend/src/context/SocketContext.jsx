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
import SocketIoClient from "socket.io-client";
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction, removePeerAction } from "../Actions/peerAction";

const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const socket = SocketIoClient("http://localhost:3000");

const SocketProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stream, setStream] = useState(null);

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
    const userID = UUIDv4();
    const newPeer = new Peer(userID, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });

    setUser(newPeer);

    userMediaStream();

    socket.on("room-created", ({ roomID }) => {
      console.log("joined-room");
      navigate(`/room/${roomID}`);
    });
  }, []);

  useEffect(() => {
    if (!user || !stream) return;

    socket.on("user-joined", ({ peerID }) => {
      console.log("Calling to : ", peerID);

      // Calling the new user
      const call = user.call(peerID, stream);
      call.on("stream", () => {
        dispatch(addPeerAction(peerID, stream));
      });
    });

    user.on("call", (call) => {
      console.log("Call from : ", call.peer);
      // receiving the call and answering with our stream
      call.answer(stream);
      call.on("stream", () => {
        dispatch(addPeerAction(call.peer, stream));
      });
    });

    socket.emit("ready");

    socket.on("user-disconnected", ({ peerID }) => {
      dispatch(removePeerAction(peerID));
      console.log("User Disconnected :", peerID);
    });
  }, [user, stream]);

  return (
    <SocketContext.Provider value={{ socket, user, stream, peers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

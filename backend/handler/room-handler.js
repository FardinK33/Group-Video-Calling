import { v4 as UUIDv4 } from "uuid";

const rooms = {};
const socketToPeer = {};

const roomHandler = (socket) => {
  socket.on("create-room", () => {
    const roomID = UUIDv4();

    rooms[roomID] = [];

    console.log(`Room created with ID: ${roomID}`);

    socket.emit("room-created", { roomID });
  });

  socket.on("joined-room", ({ roomID, peerID }) => {
    if (rooms[roomID]) {
      rooms[roomID].push(peerID);
      socketToPeer[socket.id] = peerID;
      socket.roomID = roomID;

      socket.join(roomID);
      console.log("Room Joined");
    }

    // Notifying Other users of the room by sending user's peerID to initiate a call
    socket.on("ready", () => {
      socket.to(roomID).emit("user-joined", { peerID });
    });
  });

  socket.on("disconnect", () => {
    const peerID = socketToPeer[socket.id];
    const roomID = socket.roomID;

    if (roomID && rooms[roomID]) {
      rooms[roomID] = rooms[roomID].filter((id) => id !== peerID);
      if (rooms[roomID].length == 0) delete rooms[roomID];
    }

    delete socketToPeer[socket.id];

    if (roomID && peerID) {
      socket.to(roomID).emit("user-disconnected", { peerID });
    }

    console.log("Socket Disconnected");
  });
};

export default roomHandler;

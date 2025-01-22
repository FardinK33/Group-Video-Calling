import { v4 as UUIDv4 } from "uuid";

const rooms = {};

const roomHandler = (socket) => {
  socket.on("create-room", () => {
    const roomID = UUIDv4();
    socket.join(roomID);

    rooms[roomID] = [];

    console.log(`Room created with ID: ${roomID}`);

    socket.emit("room-created", roomID);
  });

  socket.on("joined-room", ({ roomID, peerID }) => {
    if (rooms[roomID]) {
      rooms[roomID].push(peerID);

      socket.join(roomID);
      console.log("Room Joined");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
};

export default roomHandler;

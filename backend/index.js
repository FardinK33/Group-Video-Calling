import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import roomHandler from "./handler/room-handler.js";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  roomHandler(socket);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

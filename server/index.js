const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app); //create new http server

//socket server config
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//middleware
app.use(cors());

// build connection with client
io.on("connection", (socket) => {
  console.log(`New User Connected ${socket.id}`);

  //send data to client after 5 seconds
  //   setTimeout(() => {
  //     socket.emit(
  //       "connector",
  //       "send data with (emit) and received with (on) method"
  //     );
  //     // sent message after 5 second with message event and emit method
  //     socket.emit("message", "Finally I sent a message from socket server");
  //   }, 5000);

  //socket.emit("message", "message is pre define method in socket.io");

  setInterval(() => {
    const date = new Date();
    socket.emit("clock", date.toLocaleTimeString());
  }, 1000);

  //received message from server
  socket.on("message", (msg) => {
    console.log(msg);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});

//routes

app.get("/", (req, res) => {
  res.send("Socket Server is Running");
});

//server should have listen on http new created server
server.listen(port, () => {
  console.log(`socket.io server run on ${port}`);
});

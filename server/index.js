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

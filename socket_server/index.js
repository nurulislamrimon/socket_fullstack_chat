const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");

// Express server
const app = express();

// HTTP server (needed for Socket.IO)
const server = http.createServer(app);

// Socket.IO server
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Port
const port = 5000;

// Config
app.use(cors()); // Allow all origins by default

// Route
app.get("/", (req, res) => {
  const message = req.query.message;

  // Emit notification to all connected clients
  io.emit("notification", { message });

  res.send("Hello World!");
});

// Socket.IO connection
io.on("connection", (ws) => {
  console.log("Client connected with id: " + ws.id);

  ws.on("send-message", (data, room) => {
    if (!room) {
      console.log("Received: %s", data);
      io.emit("receive-message", data);
    } else {
      console.log(room);

      ws.to(room).emit("receive-message", data);
    }
  });

  ws.on("broadcast-message", (data) => {
    console.log("Received: %s", data);
    ws.broadcast.emit("broadcast-message", data);
  });

  ws.on("error", (error) => {
    console.log("Error: %s", error);
  });

  ws.on("disconnect", () => {
    console.log("Client disconnected");
  });

  ws.send("Hi there, I am a WebSocket server");
});

// Server listener
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

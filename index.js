const express = require("express");
const socket = require("socket.io");
/**__app setup__**/
const app = express();

/**__server setup__**/
const server = app.listen(4000, () => {
  console.log("app is listening at port 4000");
});

/**__route setup__**/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/**__socket setup__**/
const io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});

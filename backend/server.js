const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static('../public'));

let currentUser = null;
let queue = [];

io.on('connection', socket => {
  socket.on('request_control', () => {
    if (!currentUser) {
      currentUser = socket.id;
      socket.emit('control_granted');
    } else {
      queue.push(socket.id);
      socket.emit('queued', queue.length);
    }
  });

  socket.on('release_control', () => {
    if (socket.id === currentUser) {
      currentUser = queue.shift() || null;
      if (currentUser) io.to(currentUser).emit('control_granted');
    }
  });

  socket.on('disconnect', () => {
    if (socket.id === currentUser) {
      currentUser = queue.shift() || null;
      if (currentUser) io.to(currentUser).emit('control_granted');
    } else {
      queue = queue.filter(id => id !== socket.id);
    }
  });
});

server.listen(3000, () => console.log('Backend running on http://localhost:3000'));

import express from 'express';
import { createServer } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust according to your frontend host
    methods: ["GET", "POST"]
  }
});

// Require your game logic and socket handlers
// Require your game logic and socket handlers
require('./socketHandlers').default(io);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

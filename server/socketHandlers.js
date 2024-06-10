export default function(io) {
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
  
      // More event listeners based on your game logic
    });
  };
  
let io;

const initSocket = (server) => {
  const socketIo = require("socket.io");
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from React app
      methods: ["GET", "POST"],
    },
  });
  let users = [];

  
  io.on("connection", (socket) => {
    socket.on('register', (userId) => {
       let filterUsers= users.filter((user)=>(
      user.userId!==userId
       ))
       filterUsers.push({ userId, socketId:socket.id })
       users=filterUsers
   console.log(users )
    });
    
    socket.on('private_message', ({ to, from, message }) => {
      const user = users.find((user) => user.userId === to);
 
    console.log(user)

    if (user) {
      // If user found, send message to that user
      console.log(user.socketId);
      // You can emit the message to the user's socket
      io.to(user.socketId).emit('private_message', { from, message });
    } else {
      console.log('User not found');
    }
    
    });
    

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};



const getIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIo };

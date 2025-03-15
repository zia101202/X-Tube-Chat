const { saveToDatabaseMessages } = require("../controllers/messages/messages");
const { AddMessages } = require("../controllers/messages/group");

let io;

const initSocket = (server) => {
  const socketIo = require("socket.io");
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONT, 
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow necessary headers
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  });
  let users = [];

  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      io.emit("updateUsers", users);
      console.log("user id ");
      console.log(users);
      console.log("user id ");
      if (userId) {
        let filterUsers = users.filter((user) => user.userId !== userId);
        filterUsers.push({ userId, socketId: socket.id });
        users = filterUsers;
      }
    });

    socket.on("private_message", ({ to, from,value, message, file }) => {
      if (to !== null && from !== null && message !== null) {
        saveToDatabaseMessages({ to, from, message, file });
      }

      const user = users.find((user) => user.userId === to);

      if (user) {
        io.to(user.socketId).emit("private_message", { from,value, message, file });
      } else {
      }
    });
    io.emit("updateUsers", users);

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);

      const newuser = users.filter((user) => user.socketId !== socket.id);
      users = newuser;
      io.emit("updateUsers", users);
    });
    socket.on("Group_Messages", ({ group, to, from, message }) => {
      AddMessages({ group, to, from, message });
      const user = users.filter((user) => to.includes(user.userId));
      if (user.length > 0) {
        for (let i = 0; i < user.length; i++) {
          io.to(user[i].socketId).emit("Group_Messages", {
            group,
            to,
            from,
            message,
          });
        }
      } else {
        console.log("User not found");
      }
    });
    socket.on("disconnect", () => {
      ("A user disconnected");
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

const express = require("express");
const uploadRoute = require("./routes/upload/upload");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users/user");
const videoRoutes = require("./routes/video/video");
const commentsRoutes = require("./routes/comments/comments");
const watchLaterRouter = require("./routes/playList/playList");
const auth = require("./routes/auth/auth");
const chat = require("./routes/chat/chat");
const db = require("./config/mongoDb/mongoDb");
const http = require("http");
const server = http.createServer(app);
const { initSocket } = require("./chat/chat");
const path = require("path");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./controllers/middleware/authMiddleware");
const session = require('express-session');



db();

initSocket(server);
app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false,  // ❌ Change to `true` in production (HTTPS)
      httpOnly: true, // ✅ Allows cookie to be visible in browser
      sameSite: "lax" // ✅ Ensures cookies work across different sites
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true,  // Allow credentials like cookies
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow necessary headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
};

app.use(cors(corsOptions));



app.use("/groupProfile",authMiddleware, express.static(path.join(__dirname, "groupProfile")));
app.use("/api/users",authMiddleware, userRoutes);
app.use("/api",authMiddleware, uploadRoute);
app.use("/video", videoRoutes);
app.use("/comments",authMiddleware, commentsRoutes);
app.use("/personal",authMiddleware, watchLaterRouter);
app.use("/chat", authMiddleware,chat);
app.use("/auth", auth);
app.get("/", (req, res) => {
  res.send("Welcome to the Video Upload API"); 
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});




const PORT = process.env.PORT;
console.log(process.env.LOCALHOST);
server.listen(PORT, () => {
  `Server running on port ${PORT}`;
});

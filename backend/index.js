const express = require("express");
const uploadRoute = require("./routes/upload/upload");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes=require('./routes/users/user')
const videoRoutes=require('./routes/video/video')
const commentsRoutes=require('./routes/comments/comments')
const watchLaterRouter=require('./routes/playList/playList')
const db = require("./config/mongoDb/mongoDb");
const http = require('http');
const server = http.createServer(app);
const {initSocket}=  require('./chat/chat')
db();

initSocket(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use("/api", uploadRoute);
app.use("/video", videoRoutes);
app.use("/comments", commentsRoutes);
app.use("/personal", watchLaterRouter);

app.use(bodyParser.json());
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Welcome to the Video Upload API"); // Homepage route for testing purposes
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

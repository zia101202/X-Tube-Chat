const express = require("express");
const uploadRoute = require("./routes/upload/upload");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes=require('./routes/users/user')
const videoRoutes=require('./routes/video/video')
const commentsRoutes=require('./routes/comments/comments')
const db = require("./config/mongoDb/mongoDb");

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/users', userRoutes);
app.use("/api", uploadRoute);
app.use("/video", videoRoutes);
app.use("/comments", commentsRoutes);

app.use(bodyParser.json());
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Welcome to the Video Upload API"); // Homepage route for testing purposes
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

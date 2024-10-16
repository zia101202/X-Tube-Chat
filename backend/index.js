// app.js

const express = require('express');
const uploadRoute = require('./routes/upload/upload');
const app = express();
const cors=require('cors')
const bodyParser = require('body-parser');
// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Use the upload route
app.use('/api', uploadRoute);
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    console.log('hello')
    res.send('Welcome to the Video Upload API'); 
    console.log(req.body) // Homepage route for testing purposes
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

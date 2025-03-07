const { 
    updateUser,getAllUsers
    }=require('../../controllers/user/user')
const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images/'); // ✅ Set upload folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // ✅ Unique filename
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // ✅ Limit file size to 10MB
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        return cb(null, true); // ✅ Allow all image formats
      } else {
        return cb(new Error('Only image files are allowed!'), false); // ❌ Reject non-image files
      }
    }
  });



  router.post('/updateUser', upload.single('profile'), (req, res) => {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);
  
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded ❌" });
    }
  
    updateUser(req, res);
  });

  router.get('/', getAllUsers);
 


module.exports = router;
















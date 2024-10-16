// routes/uploadRoute.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadFile } = require('../../controllers/upload/upload');
const router = express.Router();

// Configure Multer to store uploaded files temporarily before uploading to a video hosting service
const storage = multer.diskStorage({
  destination: './tmp/', // Temporary folder for storing files before upload
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB (or adjust as needed)
  fileFilter: (req, file, cb) => {
    // Allowed video file types
    const filetypes = /mp4|avi|mov|mkv|wmv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // Accept the file
    } else {
      cb('Error: Only video files are allowed!'); // Reject the file
    }
  }
});

// Route to handle the file upload
router.post('/upload', upload.single('file'), uploadFile); // 'file' should match the name in your frontend input

module.exports = router;

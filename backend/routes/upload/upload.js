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
  limits: { fileSize: 100 * 1024 * 1024 }, // ✅ Limit file size (100MB here)
  fileFilter: (req, file, cb) => {
    cb(null, true); // ✅ Accept all file types
  },
});

// Route to handle the file upload
router.post('/upload', upload.single('file'), uploadFile); // 'file' should match the name in your frontend input

module.exports = router;

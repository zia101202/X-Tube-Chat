const  {returnUsersMessages}=require('../../controllers/messages/messages')
const  {CreateGroup,getAllGroups ,AddMembers}=require('../../controllers/messages/group')
const express=require('express')
const router=express.Router()
const multer=require('multer')
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


//Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'groupProfile';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); 
    }
    cb(null, dir);  
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); 
    const ext = path.extname(file.originalname); 
    cb(null, uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

router.get('/getChats',returnUsersMessages)
router.get('/getGroups',getAllGroups)
router.post('/CreateGroup',upload.single('groupImage'),CreateGroup)
router.post('/AddMembers',AddMembers)

module.exports=router


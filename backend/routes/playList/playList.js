const express=require('express')
const router=express.Router()
const {watchLaterController,getWatchLaterController,createPlaylistController,getPlaylistController}=require('../../controllers/playList/playList')

router.post('/watchLater',watchLaterController)
router.get('/getWatchLater',getWatchLaterController)
router.post('/CreatePlaylist',createPlaylistController)
router.get('/getPlaylist',getPlaylistController)

module.exports=router;
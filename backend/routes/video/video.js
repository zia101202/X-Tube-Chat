const {  getAllVideos,
    incrementViewCount,
    dislikeVideo,
    likeVideo,
    getVideoWithDetails } = require("../../controllers/video/video");
const express = require("express");
const router = express.Router();

router.get("/getAllVideos", getAllVideos);
router.patch('/:id/like', likeVideo);
router.patch('/:id/dislike',dislikeVideo);
router.patch('/:id/view', incrementViewCount);
router.get("/:id",  getVideoWithDetails);
module.exports = router;
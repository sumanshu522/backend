const express = require("express")
const dotenv = require('dotenv')
const { protect } = require("../middleware/protected")
const { createPost, getPost, getAll, getPostById,getPostByUser, getPostByHeading, likePost, unlikePost, comment } = require("../controllers/PostController")

const router = express.Router()

// Save a Post
router.post('/', protect, createPost)
// router.get('/',protect,getPost)
router.get('/', protect, getAll)
// Search for a user
router.get('/id/:postId',protect,getPostById)
router.post('/user', protect, getPostByUser)
router.post('/heading', protect, getPostByHeading)
// Like a post
router.put('/like', protect, likePost)
// Unlike a post
router.put('/unlike', protect, unlikePost)
// Comment on a post
router.post('/comment',protect,comment)




module.exports = router
const Post = require("../models/post")
const User = require('../models/user')
const Comment = require("../models/comment")

// Create a Post
module.exports.createPost = async (req, res) => {

    const { image, heading, content } = req.body

    if (!image || !heading || !content) {
        res.status(400).json({ error: 'Invalid Fields' })
        return
    }
    try {
        const post = await Post.create({
            image: image,
            heading: heading,
            content: content,
            createdBy: req.user
        })
        res.status(200).json({ post })
    } catch (error) {
        res.status(400)
        console.log(e)
        res.json({
            error: "Failed To create User"
        })
    }

}
// Get all posts
module.exports.getAll = async (req, res) => {

    try {
        const data = await Post.find({}).
            populate("createdBy", "-password").
            populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })
        res.json(data)
    } catch (error) {

        res.status(400).json({ error: "Eroor occ" })
    }


}

// Get post of a particular user
module.exports.getPostByUser = async (req, res) => {

    const { _id } = req.body

    try {
        const user = await User.findById(_id)
        const data = await Post.find({ createdBy: user }).
            populate("createdBy", "-password").
            populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })
        res.json(data)
    } catch (error) {

        res.status(400).json({ error: error })
    }


}

module.exports.getPostById = async (req, res) => {

    const _id = req.params.postId
    try {
        const post = await Post.findById(_id).
            populate("createdBy", "-password").
            populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })
        res.json(post)
    } catch (error) {
        res.status(400).json({ error: "Error Occured" })
    }

}

// Get post by Title
module.exports.getPostByHeading = async (req, res) => {

    const { heading } = req.body
    try {
        const post = await Post.find({
            "content": { $regex: '.*' + heading + '.*', $options: 'i' }
        })
            .populate("createdBy", "-password").
            populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })

        res.json(post)

    } catch (error) {
        res.status(400).json({ error: "Error in finding post" })
    }




}

// Liking a Post
module.exports.likePost = async (req, res) => {

    const { _id } = req.body
    console.log(_id)
    if (!_id) {
        res.status(400).send({ error: "No id found" })
    }
    const post = await Post.findById(_id).
        populate("createdBy", "-password").
        populate({
            path: "comments",
            populate: {
                path: "user"
            }
        })
    if (!post) {
        res.json({ error: "No post Exists" })
    }

    let flag = false
    post.likedBy.forEach((e) => {
        if (e._id.toString() === req.user._id.toString()) {
            flag = true
            return
        }
    })
    if (flag === false) {
        console.log("UPDATE")
        post.likedBy.push(req.user)
        await post.save()
    }


    res.json(post)
}

// Unlinking a post
module.exports.unlikePost = async (req, res) => {

    // console.log(_id)
    if (!req.body._id) {
        res.status(400).send({ error: "No id found" })
    }

    const post = await Post.updateOne({ _id: req.body._id }, {
        $pullAll: {
            likedBy: [{ _id: req.user._id }],
        },
    });

    const updatedPost = await Post.findById(req.body._id).
        populate("createdBy", "-password").
        populate({
            path: "comments",
            populate: {
                path: "user"
            }
        })
    res.json(updatedPost)
}

// Creating a Comment
module.exports.comment = async (req, res) => {

    const { comment, _id } = req.body
    if (!comment) {
        res.send({ error: "Invalid Comment" })
    }

    try {
        const post = await Post.findById(_id).
            populate("createdBy", "-password").
            populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })

        const myComment = await Comment.create({
            user: req.user,
            comment: comment
        })
        post.comments.push(myComment)
        await post.save()
        res.json(post)
    } catch (error) {
        res.json({ error: 'Error occured' })
    }


}




// For Testing Purpose
module.exports.getPost = async (req, res) => {

    res.json({ user: req.user })

}
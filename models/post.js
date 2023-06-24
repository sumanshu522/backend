const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required:false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false
    },
    ],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required:false
    },
    ],

}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post
const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    caption: {
        type: String,
        require: true
    }, 
    discription: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},
{ timestamps: true })

const Post = mongoose.model("Post", postSchema)

module.exports = Post
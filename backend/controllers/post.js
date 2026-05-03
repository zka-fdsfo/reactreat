const post = require('../model/postSchema')

async function createPost(req, res) {
    const { caption, discription } = req.body;
    if (!caption || !discription) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
  //hi
    const newPost = await post.create({ caption, discription });
    res.status(201).json({ message: "Post created successfully", post: newPost });
}

module.exports = { createPost }

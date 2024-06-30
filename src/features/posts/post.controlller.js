import postModel from "./post.model.js"

// for extracting all posts 
export const allPosts = (req, res) => {
    return res.status(200).json(postModel.allPosts())
}

// for extracting posts based on id 
export const postById = (req, res) => {
    let response = postModel.postById(req.params.id)
    return res.status(200).json(response)
}

// for extracting posts of current user 
export const getPost = (req, res) => {
    let response = postModel.getPost(req.cookies.userId)
    return res.status(200).json(response)
}

// for addding new post 
export const addPost = (req, res) => {
    let userId = req.cookies.userId;
    let caption = req.body.caption;
    let imageUrl = `images/${req.file.filename}`

    let response = postModel.addPost(userId, caption, imageUrl)

    if (response.success) {
        return res.status(200).json(response)
    }
    return res.status(404).json(response)
}

// for deleting the post
export const deletePost = (req, res) => {
    let id = req.params.id;
    let userId = req.cookies.userId;

    let response = postModel.deletePost(id, userId);

    if (response.success) {
        return res.status(200).json(response)
    }
    return res.status(404).json(response)
}

// for updating the post 
export const updatePost = (req, res) => {
    let id = req.params.id;
    let userId = req.cookies.userId;
    let caption = req.body.caption;
    let imageUrl = `public/images/${req.file.fileName}`

    let response = postModel.updatePost(id, userId, caption, imageUrl)

    if (response.success) {
        return res.status(200).json(response)
    }
    return res.status(404).json(response)
}
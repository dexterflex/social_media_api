import postModel from "./post.model"

// for extracting all posts 
export const allPosts = (req, res) => {
    return postModel.allPosts()
}

// for extracting posts based on id 
export const postById = (req, res) => {
    return postModel.postById(req.params.id)
}

// for extracting posts of current user 
export const getPost = (req, res) => {
    return postModel.getPost(req.cookie.userId)
}

// for addding new post 
export const addPost = (req, res) => {
    return res.send('post added ')
}

// for deleting the post
export const deletePost = (req, res) => {
    return res.send('post deleted')
}

// for updating the post 
export const updatePost = (req, res) => {
    return res.send('post updated')
}
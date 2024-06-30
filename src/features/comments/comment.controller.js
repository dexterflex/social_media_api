import commentModel from "./comment.model.js"

// for extracting commment 
export const getComment = (req, res) => {
    let response = commentModel.getComment(req.params.postId);
    return res.status(200).json(response)
}

// for adding new commment
export const addComment = (req, res) => {
    let userId = req.cookies.userId;
    let postId = req.params.postId;
    let content = req.body.content;

    let response = commentModel.addComment(userId, postId, content);
    return res.status(201).json(response)
}

// deleting the comment 
export const deleteComment = (req, res) => {
    let id = req.params.id;
    let userId = req.cookies.userId

    let response = commentModel.deleteComment(id, userId);
    if (response.success) {
        return res.status(200).json(response)
    }
    return res.status(404).json(response)
}

// update the comment 
export const updateComment = (req, res) => {
    let id = req.params.id;
    let userId = req.cookies.userId;
    let content = req.body;

    let response = commentModel.updateComment(id, userId, content);

    if (response.success) {
        return res.status(200).json(response)
    }
    return res.status(404).json(response)
}
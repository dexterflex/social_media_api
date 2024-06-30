import { likeModel } from "./like.model.js"

// for extracting likes of a post
export const getLikes = () => {
    let response = likeModel.getLikes();
    return res.status(200).json(response)
}

// for toggling the like status 
export const toggleLikes = () => {
    let userId = req.cookies.userId;
    let postId = req.query.postId;

    let response = likeModel.toggleLikes(userId, postId);

    if (response.success) {
        return res.sendStatus(200);
    }
    return res.status(400).json(response)
}
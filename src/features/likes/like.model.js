import postModel from "../posts/post.model.js";

let count = 0;
let likes = [];

export class likeModel {

    constructor(userId, postId) {
        this.id = ++count;
        this.userId = userId;
        this.postId = postId;
    }

    // for extracting likes of a post
    static getLikes(postId) {
        let filteredLikes = likes.filter(l => l.postId == postId);
        return filteredLikes;
    }

    // for toggling the like status 
    static toggleLikes(userId, postId) {
        let posts = postModel.allPosts().posts;

        let post = posts.find(p => p.postId == postId);

        if (!post) {
            return { success: false, msg: "post not found" }
        }
        else {
            let likeIndex = likes.findIndex(l =>
                l.postId == postId &&
                l.userId == userId
            )
            if (likeIndex == -1) {
                likes.push(new likeModel(userId, postId));

            }
            else {
                likes.splice(likeIndex, 1);
            }
            return { success: true }
        }
    }
}
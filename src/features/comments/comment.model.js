let comments = [];

export default class commentModel {
    static count = 0;
    constructor(userId, postId, content) {
        this.id = ++count;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    // for extracting commment of a specific post
    static getComment(postId) {
        let comments = comments.filter(c => c.postId == postId)
        return { success: true, comments }
    }

    // for adding new commment to a specific post
    static addComment(userId, postId, content) {
        let newComment = new commentModel(postId, userId, content);
        comments.push(newComment);

        return { success: true, comment: newComment }
    }

    // deleting the comment 
    static deleteComment(id, userId) {
        let commentIndex = comments.findIndex(c =>
            c.id == id &&
            c.userId == userId
        )
        if (commentIndex != -1) {
            let comment = comments[commentIndex]
            comments.splice(commentIndex, 1);
            return { success: true, comment }
        }
        return { success: false, msg: "comment not found" }
    }

    // update the comment 
    static updateComment(id, userId, content) {
        let comment = comments.find(c =>
            c.id == id &&
            c.userId == userId
        )
        if (comment) {
            comment.content = content;
            return { success: true, comment }
        }
        return { success: false, msg: "comment not found" }
    }
}
let count = 0;
let comments = [];

export default class commentModel {
    constructor(userId, postId, content) {
        this.id = ++count;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    // Function to fetch comments of a specific post with pagination
    static getComment(postId, page = 1, limit = 10) {
        // Filter comments based on postId
        let filteredComments = comments.filter(c => c.postId === postId);

        // Calculate the start index of the subset of comments to fetch
        const startIndex = (page - 1) * limit;

        // Apply pagination: Slice the array to fetch only the subset of comments for the current page
        let paginatedComments = filteredComments.slice(startIndex, startIndex + limit);

        // Return the paginated result
        return { success: true, comments: paginatedComments };
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
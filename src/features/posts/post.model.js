let count = 0;

export default class postModel {
    constructor(userId, caption, imageUrl) {
        this.id = ++count;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    // for extracting all posts
    static allPosts() {
        return { success: true, posts }
    }

    // for extracting posts based on id 
    static postById = (id) => {
        let post = posts.find(p => p.id == id);
        if (post) {
            return { success: true, post }
        }
        return { success: false, msg: "not found" }
    }


    // for extracting posts of current user
    static getPost(userId) {
        let userPosts = posts.filter(p => p.userId == userId);
        return { success: true, userPosts }
    }

    // for addding new post 
    static addPost = (userId, caption, imageUrl) => {
        let newPost = new postModel(userId, caption, imageUrl);
        posts.push(newPost);
        return { success: true, newPost }
    }

    // for deleting the post
    static deletePost = (id, userId) => {
        let postIndex = posts.findIndex(p =>
            p.id == id &&
            p.userId == userId
        )

        if (postIndex != -1) {
            let post = posts[postIndex];
            posts.splice(postIndex, 1);
            return { success: true, post }
        }
        return { success: false, msg: "post not found" }
    }

    // for updating the post
    static updatePost = (id, userId, caption, imageUrl) => {
        let post = posts.find(p =>
            p.id == id &&
            p.userId == userId
        )

        if (post) {
            if (caption) {
                post.caption = caption;
            }
            if (imageUrl) {
                post.imageUrl = imageUrl;
            }
            return { success: true, post }
        }
        return { success: false, msg: "post not found" }
    }
}




let posts = []
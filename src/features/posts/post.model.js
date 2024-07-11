let count = 0;
let posts = []


function isArchived(userId, post) {
    let result = post.Archived.find(pa => pa == userId);
    if (result) {
        return true;
    }
    return false;
}

export default class postModel {

    constructor(userId, caption, imageUrl) {
        this.id = ++count;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.Archived = [];
        this.isDraft = false;
    }



    // for extracting all posts
    static allPosts(userId) {
        let allPosts = posts.filter(p => !isArchived(userId, p) && !p.isDraft)
        return { success: true, allPosts: allPosts }
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
        let userPosts = posts.filter(p => p.userId == userId && !isArchived(userId, p) && !p.isDraft);
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

    // filter on caption 
    static filterByCaption(caption, userId) {
        let filteredPosts = posts.filter(p => p.caption.toUpperCase() == caption.toUpperCase() && !isArchived(userId, p) && !p.isDraft);
        return { success: true, msg: "filtered by caption", posts: filteredPosts };
    }

    // to make post archieve 
    static toggleArchieve(postId, userId) {
        let post = posts.find(p.id == postId);
        let msg = ""
        if (post) {
            let index = post.Archived.findIndex(pa => pa == userId);
            if (index != -1) {
                post.Archived.splice(index)
                msg: "deleted from Archieve"
            }
            else {
                post.Archived.push(userId)
                msg: "Added to Archieve"
            }
            return { success: true, msg }
        }
        else {
            return { success: false, msg: "post not found" }
        }
    }
    // for addding new post 
    static addToDraft = (userId, caption, imageUrl) => {
        let newPost = new postModel(userId, caption, imageUrl);
        newPost.isDraft = true
        posts.push(newPost);
        return { success: true, newPost }
    }
    // all archieved posts 
    static allArchievedPosts(userId) {
        let filteredAllPosts = posts.filter(p => isArchived(userId, p) && !p.isDraft)
        return { success: true, allPosts: filteredAllPosts }
    }

    // all Draft posts  
    static allDraftPosts(userId) {
        let filteredAllPosts = posts.filter(p => p.userId == userId && isArchived(userId, p) && p.isDraft)
        return { success: true, allPosts: filteredAllPosts }
    }


}




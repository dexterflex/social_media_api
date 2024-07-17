let count = 0;
let posts = []


function isArchived(userId, post) {
    let result = post.Archived.find(pa => pa == userId);
    if (result) {
        return true;
    }
    return false;
}

function isBookmark(userId, post) {
    let result = post.Bookmark.find(pb => pb == userId);
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
        this.Bookmark = [];
        this.isDraft = false;
        this.engagement = 0;
    }



    // for extracting all posts
    static allPosts(userId, page = 1) {
        const startIndex = (page - 1) * 10;

        // Filter posts based on userId, not archived, and not draft
        let filteredPosts = posts.filter(p => !isArchived(userId, p) && !p.isDraft);

        // Apply pagination: Slice the array to fetch only the subset of posts for the current page
        let paginatedPosts = filteredPosts.slice(startIndex, startIndex + 10);

        // Return the paginated result
        return { success: true, allPosts: paginatedPosts };
    }

    // for extracting posts based on id 
    static postById = (id) => {
        let post = posts.find(p => p.id == id);
        if (post) {
            post.engagement++;
            return { success: true, post }
        }
        return { success: false, msg: "not found" }
    }

    // Function to fetch posts of the current user with pagination
    static getPost(userId, page = 1) {
        // Filter posts based on userId, not archived, and not draft
        let filteredPosts = posts.filter(p => p.userId === userId && !isArchived(userId, p) && !p.isDraft);

        // Calculate the start index of the subset of posts to fetch
        const startIndex = (page - 1) * 10;

        // Apply pagination: Slice the array to fetch only the subset of posts for the current page
        let paginatedPosts = filteredPosts.slice(startIndex, startIndex + 10);

        // Return the paginated result
        return { success: true, userPosts: paginatedPosts };
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
        let post = posts.find(p => p.id == postId);
        if (post) {
            let msg = ""
            let index = post.Archived.findIndex(pa => pa == userId);
            if (index != -1) {
                post.Archived.splice(index)
                msg = "deleted from Archieve"
            }
            else {
                post.Archived.push(userId)
                msg = "Added to Archieve"
            }
            return { success: true, msg, load: post }
        }
        else {
            return { success: false, msg: "post not found" }
        }
    }

    // to make post bookmark
    static toggleBookmark(postId, userId) {
        let post = posts.find(p => p.id == postId);
        if (post) {
            let msg = ""
            let index = post.Bookmark.findIndex(pa => pa == userId);
            if (index != -1) {
                post.Bookmark.splice(index)
                msg = "deleted from Bookmark"
            }
            else {
                post.Bookmark.push(userId)
                msg = "Added to Bookmark"
            }
            return { success: true, msg, load: post }
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
        return { success: true, msg: "all archieved posts", allPosts: filteredAllPosts }
    }

    // all Draft posts  
    static allDraftPosts(userId) {
        let filteredAllPosts = posts.filter(p => p.userId == userId && isArchived(userId, p) && p.isDraft)
        return { success: true, msg: "all drafted posts", allPosts: filteredAllPosts }
    }

    // all bookmark posts 
    static allBookmarkPosts(userId) {
        let filteredPosts = posts.filter(p => !isArchived(userId, p) && !p.isDraft && isBookmark(userId, p))
        return { success: true, msg: "all bookmark posts", allPosts: filteredPosts }
    }

}




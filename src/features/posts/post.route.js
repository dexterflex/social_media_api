import express from "express";
import { addPost, allPosts, deletePost, getPost, postById, updatePost, filterByCaption, toggleArchieve, addToDraft, allArchievedPosts, allDraftPosts, toggleBookmark, allBookmarkPosts } from "./post.controller.js";

import upload from "../../middlewares/fileUpload.js";

const postRouter = express.Router();

// get routes 
postRouter.get('/all', allPosts)
postRouter.get('/', getPost)
postRouter.get('/filter/filterbycaption', filterByCaption)
postRouter.get('/archieve', allArchievedPosts)
postRouter.get('/draft', allDraftPosts)
postRouter.get('/bookmark', allBookmarkPosts)
postRouter.get('/:id', postById)

// post routes 
postRouter.post('/', upload.single('imageUrl'), addPost)
postRouter.post('/draft', upload.single('imageUrl'), addToDraft)

// put routes 
postRouter.put('/:id', upload.single('imageUrl'), updatePost)
postRouter.put('/archieve/:postId', toggleArchieve)
postRouter.put('/bookmark/:postId', toggleBookmark)

// delete routes å
postRouter.delete('/:id', deletePost)


export default postRouter;
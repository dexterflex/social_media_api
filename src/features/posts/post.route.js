import express from "express";
import { addPost, allPosts, deletePost, getPost, postById, updatePost, filterByCaption, toggleArchieve, addToDraft, allArchievedPosts, allDraftPosts } from "./post.controller.js";

import upload from "../../middlewares/fileUpload.js";

const postRouter = express.Router();

postRouter.get('/all', allPosts)
postRouter.get('/:id', postById)
postRouter.get('/', getPost)
postRouter.post('/', upload.single('imageUrl'), addPost)
postRouter.delete('/:id', deletePost)
postRouter.put('/:id', upload.single('imageUrl'), updatePost)
postRouter.get('/filter/filterbycaption', filterByCaption)
postRouter.put('/archieve/:postId', toggleArchieve)
postRouter.put('/draft', addToDraft)
postRouter.get('/archieve', allArchievedPosts)
postRouter.get('/draft', allDraftPosts)

export default postRouter;
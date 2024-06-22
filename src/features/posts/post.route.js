import express from "express";
import { addPost, allPosts, deletePost, getPost, postById, updatePost } from "./post.controlller.js";

const postRouter = express.Router();

postRouter.get('/all', allPosts)
postRouter.get('/:id', postById)
postRouter.get('/', getPost)
postRouter.post('/', addPost)
postRouter.delete('/:id', deletePost)
postRouter.put('/:id', updatePost)

export default postRouter;
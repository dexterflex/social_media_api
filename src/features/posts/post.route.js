import express from "express";
import { addPost, allPosts, deletePost, getPost, postById, updatePost } from "./post.controlller.js";

import upload from "../../middlewares/fileUpload.js";

const postRouter = express.Router();

postRouter.get('/all', allPosts)
postRouter.get('/:id', postById)
postRouter.get('/', getPost)
postRouter.post('/', upload.single('imageUrl'), addPost)
postRouter.delete('/:id', deletePost)
postRouter.put('/:id', upload.single('imageUrl'), updatePost)

export default postRouter;
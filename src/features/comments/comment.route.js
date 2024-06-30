import express from 'express';
import { addComment, deleteComment, getComment, updateComment } from './comment.controller.js';

const commentRouter = express.Router()


commentRouter.get('/:postId', getComment)
commentRouter.post('/:postId', addComment)
commentRouter.delete('/:id', deleteComment)
commentRouter.put('/:id', updateComment)

export default commentRouter;
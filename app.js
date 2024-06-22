import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import userRouter from './src/features/users/user.route.js';
import commentRouter from './src/features/comments/comment.route.js';
import postRouter from './src/features/posts/post.route.js';
import likeRouter from './src/features/likes/like.route.js';
import { jwtAuth } from './src/middlewares/jwtAuth.js';

const app = express();

// middlewares 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// routes
app.use('/api', userRouter)
app.use('/api/posts', jwtAuth, postRouter)
app.use('/api/comments', jwtAuth, commentRouter)
app.use('/api/likes', jwtAuth, likeRouter)

export default app;
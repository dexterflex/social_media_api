import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express'

import userRouter from './src/features/users/user.route.js';
import commentRouter from './src/features/comments/comment.route.js';
import postRouter from './src/features/posts/post.route.js';
import likeRouter from './src/features/likes/like.route.js';
import { jwtAuth } from './src/middlewares/jwtAuth.js';
import { infoLogger, warnLogger, errorLogger } from './src/handler/logger.js';
import { ApplicationError } from './src/handler/errorHandler.js';
import apiDocs from './swagger.json' assert {type: 'json'}


const app = express();

// middlewares 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// logger 
app.use((req, res, next) => {
    let logData = " : " + req.url + " : " + req.method + " : " + JSON.stringify(req.body);
    infoLogger.info(logData)
    next();
})




// routes
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
app.use('/api', userRouter)
app.use('/api/posts', jwtAuth, postRouter)
app.use('/api/comments', jwtAuth, commentRouter)
app.use('/api/likes', jwtAuth, likeRouter)

// 404 route 
app.use((req, res) => {
    warnLogger.warn(`${req.url} not Found`)
    return res.status(404).send("404 not found,Route not Found");
})

// Error handler middleware 
app.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
        errorLogger.error(err.message)
        return res.status(err.statusCode).send(err.message)
    }
    return res.status(500).send("Internal Server Error")
})


export default app;
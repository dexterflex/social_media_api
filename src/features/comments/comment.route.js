import express from 'express';

const commentRouter = express.Router()


commentRouter.route('/').get((req, res) => {
    res.send("comment")
})

export default commentRouter;
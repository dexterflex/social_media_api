import express from 'express'

const likeRouter = express.Router();

likeRouter.route('/').get((req, res) => {
    res.send("like")
})

export default likeRouter;
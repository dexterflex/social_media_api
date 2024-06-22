import express from 'express'
import { logout, signIn, signUp } from './user.controller.js';
import signupValidate from '../../validators/signup.validator.js';

const userRouter = express.Router()

userRouter.post('/signup', signupValidate, signUp)
userRouter.post('/signin', signIn)
userRouter.get('/logout', logout)

export default userRouter;
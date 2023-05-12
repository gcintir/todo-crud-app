import express from 'express'
import * as authController from '../controller/AuthController.js'

const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.post('/register', authController.register)

export default authRouter

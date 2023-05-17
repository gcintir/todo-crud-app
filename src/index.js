import dotenv from 'dotenv'
dotenv.config()
import appLogger from './util/AppLogger.js'
import express from 'express'
import bodyParser from 'body-parser'
import { openDbConnection } from './config/db.js'
import * as association from './model/Association.js'

import authRouter from './router/AuthRouter.js'
import todoItemRouter from './router/TodoItemRouter.js'

import { validateToken } from './middleware/AuthHandler.js'

import * as todoItemService from './service/TodoItemService.js'
import * as authService from './service/AuthService.js'

const expressApp = express()
expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(bodyParser.json())

expressApp.use('/auth', authRouter)
expressApp.use('/todoitem', validateToken, todoItemRouter)

expressApp.get('/', (req, res) => {
    res.send('Server is UP')
})

const PORT = process.env.SERVER_PORT

expressApp.listen(PORT, appLogger.info(`Server is UP at port ${PORT}`))

await openDbConnection()

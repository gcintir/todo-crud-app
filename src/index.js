import dotenv from 'dotenv'
dotenv.config()
import appLogger from './util/AppLogger.js'
import express from 'express'
import { openDbConnection } from './config/db.js'
import * as association from './model/Association.js'

import * as todoItemService from './service/TodoItemService.js'
import * as authService from './service/AuthService.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Server is UP')
})

const PORT = process.env.SERVER_PORT

app.listen(PORT, appLogger.info(`Server is UP at port ${PORT}`))

await openDbConnection()

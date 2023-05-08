import dotenv from 'dotenv'
dotenv.config()
import appLogger from './util/AppLogger.js'
import express from 'express'
import { openDbConnection } from './config/db.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Server is UP')
})

const PORT = process.env.SERVER_PORT

app.listen(PORT, appLogger.info(`Server is UP at port ${PORT}`))

await openDbConnection()

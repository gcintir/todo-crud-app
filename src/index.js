import appLogger from './util/AppLogger.js'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Server is UP')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, appLogger.info(`Server is UP at port ${PORT}`))
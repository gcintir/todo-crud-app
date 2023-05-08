import appLogger from '../util/AppLogger.js'
import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
})

export async function openDbConnection() {
    try {
        await sequelize.authenticate()
        appLogger.info('DbConnection has been established successfully')
    } catch (error) {
        appLogger.error('Unable to connect to db. error: ' + error)
    }
}

export async function closeDbConnection() {
    try {
        await sequelize.close()
        appLogger.info('DbConnection closed successfully')
    } catch (error) {
        appLogger.error('Unable to close dbConnection. error: ' + error)
    }
}

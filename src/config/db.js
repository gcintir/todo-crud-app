import appLogger from '../util/AppLogger.js'
import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
})

export async function openDbConnection() {
    try {
        await sequelize.authenticate()
        appLogger.info('DbConnection has been established successfully')
        await synchronizeDb()
    } catch (error) {
        appLogger.error('Unable to connect to db. error: ' + error)
    }
}

async function synchronizeDb() {
    await sequelize.sync({ force: true })
    appLogger.info('All models were synchronized successfully')
}
/*
async function updateDb() {
    await sequelize.sync({ alter: true })
    appLogger.info('All models were updated successfully')
}
*/

export async function closeDbConnection() {
    try {
        await sequelize.close()
        appLogger.info('DbConnection closed successfully')
    } catch (error) {
        appLogger.error('Unable to close dbConnection. error: ' + error)
    }
}

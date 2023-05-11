import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'

const TABLE_NAME = 'user'

export const User = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: TABLE_NAME,
    }
)

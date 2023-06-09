import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'

const TABLE_NAME = 'todo_item'

export const TodoItem = sequelize.define(
    TABLE_NAME,
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: TABLE_NAME,
    }
)

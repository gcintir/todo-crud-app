import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'

export const TodoItem = sequelize.define('todo_item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

await TodoItem.sync({ alter: true });
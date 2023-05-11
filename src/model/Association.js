import { User } from './User.js'
import { TodoItem } from './TodoItem.js'

User.hasMany(TodoItem, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    as: 'todoItems',
})

TodoItem.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
})

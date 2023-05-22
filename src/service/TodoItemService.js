import appLogger from '../util/AppLogger.js'
import { TodoItem } from '../model/TodoItem.js'
import { Op } from 'sequelize'

export async function saveTodoItem(title, description, expiryDate, userId) {
    const todoItem = await TodoItem.build({
        title: title,
        description: description,
        expiryDate: expiryDate || null,
        userId: userId,
    })
    const todoItemRecord = await todoItem.save()
    appLogger.info('todoItem created with id ' + todoItemRecord.id)
    return todoItemRecord ? todoItemRecord.dataValues : undefined
}

export async function updateTodoItem(todoItem) {
    let savedTodoItem = await TodoItem.findByPk(todoItem.id)
    if (savedTodoItem === null) {
        return savedTodoItem
    } else {
        const updatedFields = {}
        if (todoItem.title) {
            updatedFields.title = todoItem.title
        }
        if (todoItem.description) {
            updatedFields.description = todoItem.description
        }
        if (todoItem.isDone) {
            updatedFields.isDone = todoItem.isDone
        }
        if (todoItem.expiryDate) {
            updatedFields.expiryDate = todoItem.expiryDate
        }
        savedTodoItem.set(updatedFields)
        savedTodoItem = await savedTodoItem.save()
        return savedTodoItem.dataValues
    }
}

export async function deleteTodoItem(id) {
    let savedTodoItem = await TodoItem.findByPk(id)
    if (savedTodoItem === null) {
        return undefined
    } else {
        return await savedTodoItem.destroy()
    }
}

export async function getAllTodoItems() {
    const todoItems = await TodoItem.findAll()
    return todoItems
}

export async function getAllTodoItemsByPagination(offset, limit) {
    const { count, rows } = await TodoItem.findAndCountAll({
        offset: offset,
        limit: limit,
        where: {},
    })
    return rows !== undefined && rows[0] !== undefined
        ? rows.map((r) => r.dataValues)
        : undefined
}

export async function searchTodoItemsByPagination(
    offset,
    limit,
    searchObjects
) {
    let whereCriteria
    if (
        searchObjects.title ||
        searchObjects.description ||
        searchObjects.isDone
    ) {
        whereCriteria = {
            [Op.and]: [
                { userId: searchObjects.userId },
                {
                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: '%' + searchObjects.title + '%',
                            },
                        },
                        {
                            description: {
                                [Op.like]:
                                    '%' + searchObjects.description + '%',
                            },
                        },
                        {
                            isDone: {
                                [Op.eq]: searchObjects.isDone,
                            },
                        },
                    ],
                },
            ],
        }
    } else {
        whereCriteria = {
            userId: {
                [Op.eq]: searchObjects.userId,
            },
        }
    }

    const { count, rows } = await TodoItem.findAndCountAll({
        offset: offset,
        limit: limit,
        where: whereCriteria,
        order: [
            ['expiryDate', 'ASC'],
            ['updatedAt', 'DESC'],
            ['createdAt', 'ASC'],
        ],
    })
    return rows !== undefined && rows[0] !== undefined
        ? rows.map((r) => r.dataValues)
        : undefined
}

export async function getTodoItemById(id) {
    const todoItem = await TodoItem.findByPk(id)
    return todoItem === null ? undefined : todoItem.dataValues
}

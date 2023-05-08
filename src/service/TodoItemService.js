import appLogger from '../util/AppLogger.js'
import { TodoItem } from '../model/TodoItem.js'

export async function saveTodoItem(title, description) {
    const todoItem = await TodoItem.create({
        title: title,
        description: description,
    })
    appLogger.info('todoItem created with id ' + todoItem.id)
    return todoItem
}

export async function updateTodoItem(todoItem) {
    let savedTodoItem = await await TodoItem.findByPk(todoItem.id)
    if (savedTodoItem === null) {
        return savedTodoItem
    } else {
        savedTodoItem.title = todoItem.title
        saveTodoItem.description = todoItem.description
        savedTodoItem.isDone = todoItem.isDone
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

export async function getTodoItemById(id) {
    const todoItem = await TodoItem.findByPk(id)
    return todoItem === null ? undefined : todoItem.dataValues
}

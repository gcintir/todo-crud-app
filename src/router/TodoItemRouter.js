import express from 'express'
import * as todoItemController from '../controller/TodoItemController.js'

const todoItemRouter = express.Router()

todoItemRouter.post('', todoItemController.saveTodoItem)
todoItemRouter.put('/:id', todoItemController.updateTodoItem)
todoItemRouter.get('/:id', todoItemController.getTodoItem)
todoItemRouter.delete('/:id', todoItemController.deleteTodoItem)
todoItemRouter.post('/search', todoItemController.searchTodoItem)

export default todoItemRouter

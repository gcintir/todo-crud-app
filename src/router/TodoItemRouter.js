import express from 'express'
import * as todoItemController from '../controller/TodoItemController.js'

const todoItemRouter = express.Router()

todoItemRouter.post('', todoItemController.saveTodoItem)

export default todoItemRouter

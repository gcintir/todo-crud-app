import appLogger from '../util/AppLogger.js'
import * as todoItemService from '../service/TodoItemService.js'
import { ApiResponse } from '../dto/ApiResponse.js'
import { User } from '../model/User.js'

export async function saveTodoItem(req, res) {
    try {
        const { title, description, expiryDate } = req.body
        const { userId } = req.user
        const todoItem = await todoItemService.saveTodoItem(
            title,
            description,
            expiryDate,
            userId
        )
        const apiResponse = new ApiResponse(todoItem, undefined)
        res.status(200).json(apiResponse)
    } catch (error) {
        appLogger.error(error?.message)
        const apiResponse = new ApiResponse(undefined, 'Save operation failed')
        res.status(500).json(apiResponse)
    }
}

export async function updateTodoItem(req, res) {
    try {
        const id = req.params.id
        const {
            title = undefined,
            description = undefined,
            isDone = undefined,
            expiryDate = undefined,
        } = req.body
        let todoItem = {
            id: id,
            title: title,
            description: description,
            isDone: isDone,
            expiryDate: expiryDate,
        }
        todoItem = await todoItemService.updateTodoItem(todoItem)
        const apiResponse = new ApiResponse(todoItem, undefined)
        res.status(200).json(apiResponse)
    } catch (error) {
        appLogger.error(error?.message)
        const apiResponse = new ApiResponse(
            undefined,
            'Update operation failed'
        )
        res.status(500).json(apiResponse)
    }
}

export async function getTodoItem(req, res) {
    try {
        const id = req.params.id
        const todoItem = await todoItemService.getTodoItemById(id)
        const apiResponse = new ApiResponse(todoItem, undefined)
        res.status(200).json(apiResponse)
    } catch (error) {
        appLogger.error(error?.message)
        const apiResponse = new ApiResponse(undefined, 'Get operation failed')
        res.status(500).json(apiResponse)
    }
}

export async function deleteTodoItem(req, res) {
    try {
        const id = req.params.id
        const todoItem = await todoItemService.deleteTodoItem(id)
        const apiResponse = new ApiResponse(todoItem, undefined)
        res.status(200).json(apiResponse)
    } catch (error) {
        appLogger.error(error?.message)
        const apiResponse = new ApiResponse(
            undefined,
            'Delete operation failed'
        )
        res.status(500).json(apiResponse)
    }
}

export async function searchTodoItem(req, res) {
    try {
        const { userId } = req.user
        const offset = req.query.offset
        const limit = req.query.limit
        const searchParameters = {
            userId: userId,
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone,
        }
        const todoItemList = await todoItemService.searchTodoItemsByPagination(
            offset,
            limit,
            searchParameters
        )
        const apiResponse = new ApiResponse(todoItemList, undefined)
        res.status(200).json(apiResponse)
    } catch (error) {
        appLogger.error(error?.message)
        const apiResponse = new ApiResponse(
            undefined,
            'Search operation failed'
        )
        res.status(500).json(apiResponse)
    }
}

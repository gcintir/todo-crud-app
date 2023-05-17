import appLogger from '../util/AppLogger.js'
import * as todoItemService from '../service/TodoItemService.js'
import { ApiResponse } from '../dto/ApiResponse.js'

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
        const apiResponse = new ApiResponse(
            undefined,
            'TodoItem save operation failed'
        )
        res.status(500).json(apiResponse)
    }
}

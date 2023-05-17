import appLogger from '../util/AppLogger.js'
import * as authService from '../service/AuthService.js'
import { ApiResponse } from '../dto/ApiResponse.js'
import { UsernameExistError } from '../error/UsernameExistError.js'
import { UserNotFoundError } from '../error/UserNotFoundError.js'

export async function register(req, res) {
    try {
        const { username, password } = req.body
        await authService.saveUser(username, password)
        const apiResponse = new ApiResponse(undefined, undefined)
        res.status(201).json(apiResponse)
    } catch (error) {
        appLogger.error(error?.message)
        if (error instanceof UsernameExistError) {
            const apiResponse = new ApiResponse(undefined, error.message)
            res.status(400).json(apiResponse)
        } else {
            const apiResponse = new ApiResponse(
                undefined,
                'Registration failed'
            )
            res.status(500).json(apiResponse)
        }
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body
        const token = await authService.login(username, password)
        const apiResponse = new ApiResponse({ token: token }, undefined)
        res.status(200).json(apiResponse)
    } catch (error) {
        appLogger.error(error?.message)
        if (error instanceof UserNotFoundError) {
            const apiResponse = new ApiResponse(undefined, error.message)
            res.status(401).json(apiResponse)
        } else {
            const apiResponse = new ApiResponse(undefined, 'Login failed')
            res.status(500).json(apiResponse)
        }
    }
}

export async function logout(req, res) {
    try {
        const token = req.header('Authorization')
        const resp = await authService.logout(token)
        if (resp) {
            const apiResponse = new ApiResponse(undefined, undefined)
            res.status(200).json(apiResponse)
        } else {
            const apiResponse = new ApiResponse(undefined, 'token not verified')
            res.status(403).json(apiResponse)
        }
    } catch (error) {
        appLogger.error(error?.message)
        const apiResponse = new ApiResponse(undefined, 'Logout failed')
        res.status(500).json(apiResponse)
    }
}

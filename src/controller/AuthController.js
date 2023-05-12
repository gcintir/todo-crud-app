import appLogger from '../util/AppLogger.js'
import * as authService from '../service/AuthService.js'
import { ApiResponse } from '../dto/ApiResponse.js'

export async function register(req, res) {
    try {
        const { username, password } = req.body
        const user = await authService.saveUser(username, password)
        if (user) {
            const token = await authService.login(username, password)
            if (token) {
                const apiResponse = new ApiResponse({ token: token }, undefined)
                res.status(200).json(apiResponse)
            } else {
                const apiResponse = new ApiResponse(undefined, 'User not found')
                appLogger.debug('User not found')
                res.status(404).json(apiResponse)
            }
        } else {
            const apiResponse = new ApiResponse(
                undefined,
                'Registration failed'
            )
            res.status(500).json(apiResponse)
        }
    } catch (error) {
        appLogger.error(error)
        const apiResponse = new ApiResponse(undefined, 'Registration failed')
        res.status(500).json(apiResponse)
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body
        const token = await authService.login(username, password)
        if (token) {
            const apiResponse = new ApiResponse({ token: token }, undefined)
            res.status(200).json(apiResponse)
        } else {
            const apiResponse = new ApiResponse(undefined, 'User not found')
            appLogger.debug('User not found')
            res.status(404).json(apiResponse)
        }
    } catch (error) {
        appLogger.error(error)
        const apiResponse = new ApiResponse(undefined, 'Login failed')
        res.status(500).json(apiResponse)
    }
}

export async function logout(req, res) {
    try {
        const { token } = req.body
        const resp = await authService.logout(token)
        if (resp) {
            const apiResponse = new ApiResponse(undefined, 'logout successful')
            res.status(200).json(apiResponse)
        } else {
            const apiResponse = new ApiResponse(undefined, 'token not verified')
            res.status(403).json(apiResponse)
        }
    } catch (error) {
        appLogger.error(error)
        const apiResponse = new ApiResponse(undefined, 'Logout failed')
        res.status(500).json(apiResponse)
    }
}

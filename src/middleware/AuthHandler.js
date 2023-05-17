import appLogger from '../util/AppLogger.js'
import * as authService from '../service/AuthService.js'
import { ApiResponse } from '../dto/ApiResponse.js'

export async function validateToken(req, res, next) {
    try {
        const token = req.header('Authorization')
        if (token) {
            const decoded = await authService.verifyJwtToken(token)
            if (decoded) {
                const { userId, username } = decoded
                req.user = {
                    userId: userId,
                    username: username,
                }
                next()
            } else {
                const apiResponse = new ApiResponse(
                    undefined,
                    'token not verified'
                )
                res.status(403).json(apiResponse)
            }
        } else {
            const apiResponse = new ApiResponse(undefined, 'token not found')
            res.status(403).json(apiResponse)
        }
    } catch (error) {
        appLogger.error(error?.message)
        const apiResponse = new ApiResponse(
            undefined,
            'token verification failed'
        )
        res.status(500).json(apiResponse)
    }
}

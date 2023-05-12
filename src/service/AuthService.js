import dotenv from 'dotenv'
dotenv.config()
import appLogger from '../util/AppLogger.js'
import { User } from '../model/User.js'
import jsonwebtoken from 'jsonwebtoken'

export async function login(username, password) {
    return await generateJwtToken({
        userId: 1,
    })
}

export async function logout(token) {
    return await verifyJwtToken(token)
}

export async function saveUser(username, password) {
    const user = await User.build({
        username: username,
        password: password,
    })
    const userRecord = await user.save()
    appLogger.info('user created with id ' + userRecord.id)
    return userRecord ? userRecord.dataValues : undefined
}

export async function getUserById(id) {
    const user = await User.findByPk(id)
    return user === null ? undefined : user.dataValues
}

export async function getUserWithTodoItemsById(id) {
    const user = await User.findByPk(id, { include: ['todoItems'] })
    return user === null ? undefined : user.dataValues
}

async function generateJwtToken(data) {
    const token = jsonwebtoken.sign(data, process.env.JWT_TOKEN_KEY, {
        expiresIn: '1h',
        algorithm: 'HS512',
    })
    return token
}

async function verifyJwtToken(token) {
    let decoded
    try {
        decoded = await jsonwebtoken.verify(token, process.env.JWT_TOKEN_KEY)
    } catch (error) {
        return undefined
    }
    return decoded
}

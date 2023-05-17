import dotenv from 'dotenv'
dotenv.config()
import appLogger from '../util/AppLogger.js'
import { User } from '../model/User.js'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UsernameExistError } from '../error/UsernameExistError.js'
import { UserNotFoundError } from '../error/UserNotFoundError.js'

export async function login(username, password) {
    const user = await getUserByUsername(username)
    if (
        user === null ||
        (await bcrypt.compare(password, user.dataValues.password)) === false
    ) {
        throw new UserNotFoundError('User not found')
    }
    return await generateJwtToken({
        userId: 1,
        username: user.dataValues.username,
    })
}

export async function logout(token) {
    return await verifyJwtToken(token)
}

export async function saveUser(username, password) {
    if ((await getUserByUsername(username)) !== null) {
        throw new UsernameExistError('Username already available')
    }
    const user = await User.build({
        username: username,
        password: await bcrypt.hash(password, +process.env.ENC_SALT),
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

async function getUserByUsername(username) {
    return await User.findOne({ where: { username: username } })
}

async function generateJwtToken(data) {
    const token = jsonwebtoken.sign(data, process.env.JWT_TOKEN_KEY, {
        expiresIn: '1h',
        algorithm: 'HS512',
    })
    return token
}

export async function verifyJwtToken(token) {
    let decoded
    try {
        decoded = await jsonwebtoken.verify(token, process.env.JWT_TOKEN_KEY)
    } catch (error) {
        return undefined
    }
    return decoded
}

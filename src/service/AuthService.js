import appLogger from '../util/AppLogger.js'
import { User } from '../model/User.js'

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

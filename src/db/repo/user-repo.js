let users = require('../data/users.json')

module.exports = (context, fieldName) => {
    // These fields require the requester to be authenticated
    const fieldsThatRequireAuth = [
        'user',
        'createUser',
        'updateUser',
        'deleteUser'
    ]

    if (fieldsThatRequireAuth.includes(fieldName) && !context.isAuth) {
        const error = new Error("You are not authenticated.")
        error.data = [context.error]
        error.code = 401
        throw error
    }

    // Authorization for user with "Admin" role only
    const hasAdminRole = context.user && context.user.roles.includes('Admin')
    return {
        getUserByEmail: (email) => {
            console.log('1 call to db for user by email')
            return users.find(u => u.email === email)
        },
        getUser: (userId) => {
            console.log('1 call to db for user by id')
            return users.find(u => u.id === Number(userId))
        },
        getUsers: () => {
            console.log('1 call to db for users')
            return users
        },
        insertUser: user => {
            if (!hasAdminRole) return new Error(`Access denied to "${fieldName}" field.`)

            console.log('1 call to db for user insert')
            const lastUsersId = users[users.length - 1].id
            const newId = lastUsersId + 1
            let newArray = [...users]
            newArray = [...newArray, { id: newId, ...user }]
            users = newArray
            return newId
        },
        updateUser: user => {
            if (!hasAdminRole) return new Error(`Access denied to "${fieldName}" field.`)

            console.log('1 call to db for user update')
            const index = users.findIndex(u => u.id === Number(user.id))
            let newArray = [...users]
            newArray[index] = { ...newArray[index], ...user, id: Number(user.id) }
            users = newArray
            return user
        },
        deleteUser: id => {
            if (!hasAdminRole) return new Error(`Access denied to "${fieldName}" field.`)

            console.log('1 call to db for user deletion')
            const index = users.findIndex(u => u.id === Number(id))
            const user = newArray[index]
            let newArray = [...users]
            newArray.splice(index, 1)
            users = newArray
            return `${user.firstName} has been deleted`
        }
    }
}
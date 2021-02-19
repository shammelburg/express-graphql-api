let roles = require('../data/roles.json')
let userRoles = require('../data/user-roles.json')

module.exports = () => {
    return {
        getRoles: () => {
            console.log('1 call to db for roles')
            return roles
        },
        getUsersRoles: () => {
            console.log('1 call to db for all users roles')
            return userRoles
        },
        getUserRoles: (userId) => {
            console.log('1 call to db for roles by userId')
            return userRoles.filter(userRole => userRole.userId === Number(userId))
        },
    }
}
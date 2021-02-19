const roleRepo = require('../../db/repo/role-repo')

const resolvers = {
    Query: {
        roles: () => {
            return roleRepo().getRoles()
        },
        userRoles: (parent, { userId }) => {
            return roleRepo().getUsersRoles(userId)
        }
    }
}

module.exports = resolvers
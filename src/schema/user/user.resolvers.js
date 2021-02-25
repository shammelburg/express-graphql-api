const jwt = require('jsonwebtoken')
const userRepo = require('../../db/repo/user-repo')
const roleRepo = require('../../db/repo/role-repo')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const {
    rolesDataLoader
} = require('../../loaders')

const resolvers = {
    Query: {
        login: (parent, { input }, context, info) => {
            const { email, password } = input
            const user = userRepo(context).getUserByEmail(email)

            if (!user)
                throw Error('User does not exist')

            if (user.password !== password)
                throw Error('Unable to verify credentials')

            const roles = roleRepo().getRoles()
            const userRoles = roleRepo().getUserRoles(user.id)
                .map(ur => ur.roleId)
                .map(id => roles.find(r => r.id === id).name)

            const token = jwt.sign(
                { email, roles: userRoles },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            )
            return token
        },
        users: (parent, args, context, info) => {
            return userRepo(context, info.fieldName).getUsers()
        },
        user: (parent, args, context, info) => {
            return userRepo(context, info.fieldName).getUser(args.id)
        }
    },
    User: {
        // Calls "roles" on type User 
        roles: (user, args, context, info) => {
            // Could use context instead, uncomment in ~/index.js
            // const { rolesDataLoader } = context.loaders
            return rolesDataLoader.load(user.id)
        }
    },
    Mutation: {
        createUser: (root, { input }, context, info) => {
            const id = userRepo(context, info.fieldName).insertUser(input)
            pubsub.publish('NEW_USER', { newUser: { ...input, id } })
            return { ...input, id }
        },
        updateUser: (root, { input }, context, info) => {
            const contact = userRepo(context, info.fieldName).updateUser(input)
            return contact
        },
        deleteUser: (root, { id }, context, info) => {
            return userRepo(context, info.fieldName).deleteUser(id)
        }
    },
    // pubsub - Cannot read property 'pubsub' of undefined
    Subscription: {
        newUser: {
            subscribe: (parent, args, context, info, x) => {
                return pubsub.asyncIterator('NEW_USER')
            }
        }
    }
}

module.exports = resolvers
const { makeExecutableSchema } = require('graphql-tools')
const merge = require('lodash.merge');

const userSchema = require('./user')
const roleSchema = require('./role')

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
    typeDefs: [
        userSchema.typeDefs, // First defines the type Query
        roleSchema.typeDefs, // Others extends type Query
    ],
    resolvers: merge(
        userSchema.resolvers,
        roleSchema.resolvers,
    )
})

module.exports = schema

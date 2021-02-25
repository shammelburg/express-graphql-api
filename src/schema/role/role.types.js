const gql = require('graphql-tag')

const typeDefs = gql`
    extend type Query {
        roles: [Role]
        userRoles: [UserRole]
        # userRoles(userId: ID!): [UserRole]
    }

    type Role {
        id: ID!
        name: String!
    }
    
    type UserRole {
        userId: ID!
        roleId: ID!
    }
`

module.exports = typeDefs
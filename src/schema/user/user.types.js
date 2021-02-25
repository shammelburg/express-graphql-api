const gql = require('graphql-tag')

const typeDefs = gql`
    type Query {
        login(input: UserLogin!): String
        
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(input: UserMutation): User
        updateUser(input: UserMutation): User
        deleteUser: String
    }

    type Subscription {
        newUser: User!
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String!
        # FOR DEMO PURPOSES ONLY - NOT IN PRODUCTION
        password: String
        roles: [Role]
    }

    input UserLogin {
        email: String!
        password: String!
    }

    input UserMutation {
        id: ID
        firstName: String!
        lastName: String
        email: String!
    }
`

module.exports = typeDefs
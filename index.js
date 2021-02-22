const express = require('express')
const compression = require('compression')
const { graphqlHTTP } = require('express-graphql')

const app = express()
const schema = require('./src/schema')
// const { rolesDataLoader } = require('./src/loaders');

app.use(express.static('public'))
app.use(require('./src/middleware/auth-middleware'))
app.use(compression())

app.get('/', (req, res) => res.send('GraphQL Server is running'))

// https://github.com/graphql/express-graphql
app.use('/graphql', graphqlHTTP(req => ({
    schema,
    graphiql: {
        defaultQuery: require('./default-query'),
        headerEditorEnabled: true,
        subscriptionEndpoint: ''
    },
    // If no context is created here, the request object is passed instead
    context: {
        isAuth: req.isAuth,
        user: req.user,
        error: req.error
        // loaders: {
        //     rolesLoader: rolesDataLoader
        // }
    },
    customFormatErrorFn: (err) => {
        if (!err.originalError) {
            return err
        }
        /* 
            You can add the following to any resolver
            const error = new Error('My message')
            error.data = [...]
            error.code = 001
        */
        const message = err.message || 'An error occured.'
        const code = err.originalError.code
        const data = err.originalError.data
        return {
            // ...err, 
            message,
            code,
            data
        }
    }
})))

app.listen(process.env.PORT, () => console.log(`[${process.env.NODE_ENV}] GraphQL Server running on http://localhost:4000/graphql`))

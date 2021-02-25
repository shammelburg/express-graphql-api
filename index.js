const express = require('express')
const compression = require('compression')
const { graphqlHTTP } = require('express-graphql')
const cors = require("cors");

// Subscriptions
const ws = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws');
const { execute, subscribe } = require('graphql');

// const { PubSub } = require('graphql-subscriptions')
// const pubsub = new PubSub()

const app = express()
const schema = require('./src/schema')
// const { rolesDataLoader } = require('./src/loaders');

app.use(cors());
app.use(express.static('public'))
app.use(require('./src/middleware/auth-middleware'))
app.use(compression())

app.get('/', (req, res) => res.send('GraphQL Server is running'))

const PORT = process.env.PORT;

// https://github.com/graphql/express-graphql
app.use('/graphql', graphqlHTTP(req => ({
    schema,
    graphiql: {
        defaultQuery: require('./default-query'),
        headerEditorEnabled: true,
        subscriptionEndpoint: `ws://localhost:4000/graphql`,
    },
    // If no context is created here, the request object is passed instead
    context: {
        isAuth: req.isAuth,
        user: req.user,
        error: req.error,
        // pubsub,
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

// GRAPHQL-WS
const server = app.listen(PORT, () => {
    console.log(`[${process.env.NODE_ENV}] GraphQL Server running on http://localhost:4000/graphql`)

    // create and use the websocket server
    const wsServer = new ws.Server({
        server,
        path: '/graphql',
    });

    useServer(
        {
            schema,
            execute,
            subscribe,
            onConnect: (ctx) => {
                console.log('Connect');
            },
            onSubscribe: (ctx, msg) => {
                console.log('Subscribe');
            },
            onNext: (ctx, msg, args, result) => {
                console.debug('Next');
            },
            onError: (ctx, msg, errors) => {
                console.error('Error');
            },
            onComplete: (ctx, msg) => {
                console.log('Complete');
            },
        },
        wsServer
    );
});

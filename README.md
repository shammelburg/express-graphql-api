## Express GraphQL API

My first attempt at GraphQL

Things I needed to figure out before really diving into GraphQL, such as, auth, n+1 problem, making database request, scalable folder structure, etc.

So I've put this project together to figure it out,

GraphQL is awesome!

#### To start
- `git clone https://github.com/shammelburg/express-graphql-api.git`
- cd express-graphql-api
- npm install
- npm start

#### To start with client sample project
- [shammelburg/graphql-rxjs-angular](https://github.com/shammelburg/graphql-rxjs-angular)
    - This project was created to show that subscriptions work with `express-graphql`


#### Features
- GraphiQL => http://localhost:4000/graphql
- JSON database
- Mulitple defType / resolver files
- Authentication middleware with JWT
- Business layer auth check and Authorization
- DataLoader to solve N+1 problem
- Error handling
- **Subscriptions** with `graphql-ws`


User data from https://www.mockaroo.com/

Learning material

- https://graphql.org/learn/
- https://jwt.io/
- [Modularizing your GraphQL schema code](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2/)
- [GraphQL over WebSockets](https://the-guild.dev/blog/graphql-over-websockets)

YouTube

- [GraphQL: The Documentary](https://www.youtube.com/watch?v=783ccP__No8)
- [GraphQL Tutorial #1 - Introduction to GraphQL](https://www.youtube.com/watch?v=Y0lDGjwRYKw)

LinkedIn

- [Migrating from REST to GraphQL](https://www.linkedin.com/learning/migrating-from-rest-to-graphql/replace-rest-with-graphql)

Repos
- [graphql/express-graphql](https://github.com/graphql/express-graphql)
- [enisdenjo/graphql-ws](https://github.com/enisdenjo/graphql-ws)
- [websockets/ws](https://github.com/websockets/ws)

import { ApolloServer } from 'apollo-server-koa'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { typeDefs } from './graph/typedefs'
import { resolvers } from './graph/resolvers'

const buildApp = (): Koa => {
  const app = new Koa()
  const router = new Router()

  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())

  const graphqlServer: ApolloServer = new ApolloServer({ typeDefs, resolvers })
  graphqlServer.applyMiddleware({ app })
  
  return app
}

const app = buildApp()

export { app }

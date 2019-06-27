import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as json from 'koa-json'
import * as applications from './applications/applications'
import * as features from './features/features'

const buildApp = (): Koa => {
  const app = new Koa()
  const router = new Router()

  router.get('/api/applications', applications.list)
  router.get('/api/applications/:id', applications.get)
  router.post('/api/applications', applications.add)
  router.patch('/api/applications/:id', applications.update)

  router.get('/api/features/:id', features.get)

  app.use(bodyParser())
  app.use(json())
  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}

const app = buildApp()

export { app }

import * as model from '../store/dataStore'

const add = async (context, next) => {
  const data = context.request.body
  context.body = await model.create(data)
  return next()
}

const get = async (context, next) => {
  const id = parseInt(context.params.id)
  context.body = await model.read(id)
  return next()
}

const update = async (context, next) => {
  const id = parseInt(context.params.id)
  const data = context.request.body
  context.body = await model.update(id, data)
  return next()
}

const list = async (context, next) => {
  context.body = await model.list()
  return next()
}

export { add, get, update, list }

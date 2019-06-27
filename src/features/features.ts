import * as model from '../store/dataStore'
import { parser } from './parser'

const get = async (context, next) => {
  const id = parseInt(context.params.id)
  const query = context.query

  const data = await model.read(id)
  context.body = parser(data.config, query)
  return next()
}
export { get }

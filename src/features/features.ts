import { workspaces } from '../store'
import { parser } from './parser'

const get = async (context, next) => {
  const id = parseInt(context.params.id)
  const query = context.query

  const data = await workspaces.read(id)
  context.body = parser(data.config, query)
  return next()
}
export { get }

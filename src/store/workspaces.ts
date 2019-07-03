import { map } from 'ramda'
import { datastore, Types } from './dataStore'

async function create(parentId: number, data) {
  const key = datastore.key([Types.APPLICATION, parentId, Types.WORKSPACE])
  return await save(key, data)
}

async function update(parentId, id, data) {
  const key = datastore.key([Types.APPLICATION, parentId, Types.WORKSPACE, parseInt(id)])
  return await save(key, data)
}

async function save(key, data) {
  const transaction = datastore.transaction()
  try {
    await transaction.run()
    transaction.save({
      key: key,
      data: [{ name: 'name', value: data.name }, { name: 'features', value: data.features }]
    })
    await transaction.commit()
  } catch (err) {
    transaction.rollback()
  }

  return { name: data.name, id: key.id }
}

async function read(parentId, id) {
  const key = datastore.key([Types.APPLICATION, parentId, Types.WORKSPACE, parseInt(id)])
  const [entity] = await datastore.get(key)

  return {
    id: entity[datastore.KEY].id,
    name: entity.name,
    features: entity.features
  }
}

async function list(parentId: number) {
  const key = datastore.key([Types.APPLICATION, parentId])
  const query = datastore.createQuery(Types.WORKSPACE).hasAncestor(key)
  const [entities] = await datastore.runQuery(query)

  return map((entity) => {
    return {
      id: entity[datastore.KEY].id,
      name: entity.name,
      features: entity.features
    }
  }, entities)
}

export { update, create, read, list }

import { map } from 'ramda'
import { datastore, Types } from './dataStore'

async function create(data) {
  const key = datastore.key(Types.APPLICATION)
  return await save(key, data)
}

async function update(id, data) {
  const key = datastore.key([Types.APPLICATION, parseInt(id)])
  return await save(key, data)
}

async function save(key, data) {
  const transaction = datastore.transaction()
  try {
    await transaction.run()
    transaction.save({
      key: key,
      data: [{ name: 'name', value: data.name }]
    })
    await transaction.commit()
  } catch (err) {
    transaction.rollback()
  }

  return { name: data.name, id: key.id }
}

async function read(id: number) {
  const key = datastore.key([Types.APPLICATION, id])
  const [entity] = await datastore.get(key)
  return entity
}

async function list() {
  const query = datastore.createQuery([Types.APPLICATION])
  const [entities] = await datastore.runQuery(query)

  return map((entity) => {
    return {
      id: entity[datastore.KEY].id,
      name: entity.name
    }
  }, entities)
}

export { update, create, read, list }

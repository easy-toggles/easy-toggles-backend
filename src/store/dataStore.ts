import { Datastore } from '@google-cloud/datastore'
import config from '../config'

const datastore = new Datastore({
  projectId: config.get('GCLOUD_PROJECT')
})

const kind = 'Application'

async function create(data) {
  const key = datastore.key(kind)
  return await save(key, data)
}

async function update(id, data) {
  const key = datastore.key([kind, id])
  return await save(key, data)
}

async function save(key, data) {
  const transaction = datastore.transaction()
  try {
    await transaction.run()
    transaction.save({
      key: key,
      data: [
        { name: 'name', value: data.name },
        { name: 'environment', value: data.environment },
        { name: 'config', value: data.config }
      ]
    })
    await transaction.commit()
  } catch (err) {
    transaction.rollback()
  }

  return { id: key.id }
}

async function read(id: number) {
  const key = datastore.key([kind, id])
  const [entity] = await datastore.get(key)
  return entity
}

export { update, create, read }

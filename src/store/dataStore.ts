import { Datastore } from '@google-cloud/datastore'
import config from '../config'

export const datastore = new Datastore({
  projectId: config.get('GCLOUD_PROJECT')
})

export enum Types {
  APPLICATION = 'Application',
  WORKSPACE = 'Workspace'
}

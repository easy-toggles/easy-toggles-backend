import GraphQLJSON from 'graphql-type-json'
import * as dataSources from '../../store'

export default {
  Query: {
    workspace(parent, args) {
      return dataSources.workspaces.read(args.applicationId, args.workspaceId)
    }
  },
  
  Mutation: {
    createWorkspace(parent, args) { 
      const { applicationId, ...params } = args.workspace
      return dataSources.workspaces.create(applicationId, params)
    },
    updateWorkspace(parent, args) {
      const { applicationId, ...params } = args.workspace 
      return dataSources.workspaces.update(applicationId, args.workspaceId, params)
    }
  },

  Workspace: {
    id(parent, args) {
      return parent.id
    },

    name(parent, args) {
      return parent.name
    },

    features(parent): GraphQLJSON {
      return parent.features
    }
  }
}

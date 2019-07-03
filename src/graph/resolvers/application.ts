import * as dataSources from '../../store'

export default {
  Query: {
    applications() {
      return dataSources.applications.list()
    }
  },
  
  Mutation: {
    createApplication(parent, args) {
      return dataSources.applications.create({
        name: args.name
      })
    },
    updateApplication(parent, args) {
      return dataSources.applications.update(args.applicationId, {
        name: args.name
      })
    }
  },

  Application: {
    id(parent, args) {
      return parent.id
    },

    name(parent, args) {
      return parent.name
    },
    workspaces(parent) {
      return dataSources.workspaces.list(parent.id)
    }
  }
}

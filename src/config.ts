import * as nconf from 'nconf'

const config = nconf
  .argv()
  .env(['NODE_ENV', 'APOLLO_OPTIONS'])
  .file({ file: '../config.json' })
  .defaults({
    APOLLO_OPTIONS: {
      port: 8000,
      endpoint: '/graphql',
      subscriptions: '/subscriptions',
      playground: '/playground',
    }
  })

export default config

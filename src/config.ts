import * as nconf from 'nconf'

const config = nconf
  .argv()
  .env(['NODE_ENV', 'PORT'])
  .file({ file: '../config.json' })
  .defaults({
    PORT: 8882
  })

export default config

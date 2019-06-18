import config from './config'
import { app } from './app'

const port = config.get('PORT')

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})

import mongoose from 'mongoose'
import app from './app'
import { config } from './config'
import { errorLogger, infoLogger } from './shared/logger'

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Database Connected')
    app.listen(config.port, () => {
      infoLogger.info('server running on port', config.port)
    })
  } catch (error) {
    errorLogger.error('Database disconnected')
  }
}
dbConnect()

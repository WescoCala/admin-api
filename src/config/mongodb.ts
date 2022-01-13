import mongoose from 'mongoose'
import { config } from './app.config'
import { logger } from './logger'

mongoose
	.connect(`${config.mongodb.server}${config.mongodb.db}`)
	.then((conn) => logger.info('Servidor MongoDB conectado...'))
	.catch((err) => logger.error(err))

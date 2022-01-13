import { config } from './app.config'
import moment from 'moment'
const { createLogger, transports, format } = require('winston')
const { combine, timestamp, printf } = format
require('winston-mongodb')
moment.locale('es-mx')

const timezoned = () => {
	return new Date(moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
}

const logFormat = printf((info: any) => {
	return `(${info.metadata.timestamp}) [${info.level}]: ${
		info.stack || info.message
	}`
})

export const logger = createLogger({
	format: combine(
		format.errors({ stack: true }),
		timestamp({ format: timezoned }),
		format.json(),
		format.metadata()
	),
	defaultMeta: { service: 'Api Abastecimiento' },
	transports: [
		new transports.Console({
			format: combine(format.simple(), format.colorize(), logFormat),
		}),
		new transports.MongoDB({
			level: 'http',
			db: `${config.mongodb.server}${config.mongodb.db}`,
			options: {
				useUnifiedTopology: true,
			},
			collection: 'appLog',
			capped: true,
		}),
	],
})

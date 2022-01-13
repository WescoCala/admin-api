import { config } from './app.config'
import { logger } from './logger'
import sql from 'mssql'

const configDB: sql.config = {
	server: config.sqlsrv.server,
	database: config.sqlsrv.db,
	user: config.sqlsrv.auth.user,
	password: config.sqlsrv.auth.pass,
}

sql.connect(configDB, (err) => {
	if (err) return logger.error('Error al conectar a SQL Server')

	return logger.info('Servidor SQL conectado...')
})

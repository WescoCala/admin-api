import Server from './app'
import './config/sql'
import './config/mongodb'
import { router } from './routes/routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import morganMiddleware from './middleware/morgan'
import { logger } from './config/logger'

const server = new Server()

server.app.use(bodyParser.urlencoded({ extended: false }))
server.app.use(bodyParser.json())

// Middleware
server.app.use(cors())
server.app.use(morgan('dev'))
server.app.use(morganMiddleware)

// Rutas
server.app.use('/', router)

server.start(() =>
	logger.info(`Servidor corriendo en localhost:${server.port}`)
)

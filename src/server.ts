import Server from './app'
import './config/sql'
import './config/mongodb'
import { router } from './routes/routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import morganMiddleware from './middleware/morgan'
import { logger } from './config/logger'

const server = new Server()

const corsOption = {
	origin: ['https://adinet.eecol.cl:89', 'http://adinet.wescocala.com'],
}

server.app.use(bodyParser.urlencoded({ extended: false }))
server.app.use(bodyParser.json())
server.app.use(cookieParser())

// Middleware
server.app.use(cors())
server.app.use(morgan('dev'))
server.app.use(morganMiddleware)

// Rutas
server.app.use('/micro/administrador', router)

server.start(() =>
	logger.info(`Servidor corriendo en localhost:${server.port}`)
)

import requestConsume from './requestConsume'
import validateToken from './auth'
import morganMiddleware from './morgan'

const Middlewares = {
	requestConsume,
	validateToken,
	morganMiddleware,
}

export default Middlewares

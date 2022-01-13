import { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger'

const requestConsume = (req: Request, res: Response, next: NextFunction) => {
	logger.http({
		message: `Datos enviados a ${req.url} por ${req.method}`,
		data: {
			body: req.body,
			ip: req.ip,
			user: req.headers['user'],
			url: req.url,
			'user-agent': req.headers['user-agent'],
		},
	})
	next()
}

export default requestConsume

import { Router } from 'express'
import * as EstadosControllers from '../controllers/estados.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post(
	'/estados',
	[validateToken, requestConsume],
	EstadosControllers.save
)
router.get(
	'/estados',
	[validateToken, requestConsume],
	EstadosControllers.getAll
)
router.get(
	'/estados/:id',
	[validateToken, requestConsume],
	EstadosControllers.get
)
router.put(
	'/estados',
	[validateToken, requestConsume],
	EstadosControllers.update
)
router.delete(
	'/estados/:id',
	[validateToken, requestConsume],
	EstadosControllers.remove
)

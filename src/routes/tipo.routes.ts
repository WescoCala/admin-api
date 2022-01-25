import { Router } from 'express'
import { TipoPropuestaController } from '../controllers/tipos.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post(
	'/tipo/propuesta',
	[validateToken, requestConsume],
	TipoPropuestaController.save
)
router.get(
	'/tipo/propuesta/:id',
	[validateToken, requestConsume],
	TipoPropuestaController.get
)
router.get(
	'/tipo/propuesta',
	[validateToken, requestConsume],
	TipoPropuestaController.getAll
)
router.put(
	'/tipo/propuesta',
	[validateToken, requestConsume],
	TipoPropuestaController.update
)
router.delete(
	'/tipo/propuesta/:id',
	[validateToken, requestConsume],
	TipoPropuestaController.remove
)

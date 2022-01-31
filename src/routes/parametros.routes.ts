import { Router } from 'express'
import {
	DivisasController,
	ValoresController,
} from '../controllers/parametros.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.get(
	'/divisas',
	[validateToken, requestConsume],
	DivisasController.getAll
)
router.get(
	'/divisas/:id',
	[validateToken, requestConsume],
	DivisasController.get
)
router.get(
	'/valores',
	[validateToken, requestConsume],
	ValoresController.getAll
)
router.get(
	'/valores/:id',
	[validateToken, requestConsume],
	ValoresController.get
)

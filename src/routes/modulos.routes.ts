import { Router } from 'express'
import * as ModulosControllers from '../controllers/modulos.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post(
	'/modulos',
	[validateToken, requestConsume],
	ModulosControllers.save
)
router.get(
	'/modulos',
	[validateToken, requestConsume],
	ModulosControllers.getAll
)
router.get(
	'/modulos/:id',
	[validateToken, requestConsume],
	ModulosControllers.get
)
router.put(
	'/modulos',
	[validateToken, requestConsume],
	ModulosControllers.update
)
router.delete(
	'/modulos/:id',
	[validateToken, requestConsume],
	ModulosControllers.remove
)

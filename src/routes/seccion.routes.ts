import { Router } from 'express'
import * as SeccionesControllers from '../controllers/secciones.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post(
	'/secciones',
	[validateToken, requestConsume],
	SeccionesControllers.save
)
router.get(
	'/secciones',
	[validateToken, requestConsume],
	SeccionesControllers.getAll
)
router.get(
	'/secciones/:id',
	[validateToken, requestConsume],
	SeccionesControllers.get
)
router.put(
	'/secciones',
	[validateToken, requestConsume],
	SeccionesControllers.update
)
router.delete(
	'/secciones/:id',
	[validateToken, requestConsume],
	SeccionesControllers.remove
)

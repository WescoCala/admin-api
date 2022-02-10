import { Router } from 'express'
import * as SucursalControllers from '../controllers/sucursal.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post(
	'/sucursales',
	[validateToken, requestConsume],
	SucursalControllers.save
)
router.get(
	'/sucursales',
	[validateToken, requestConsume],
	SucursalControllers.getAll
)
router.get(
	'/sucursales/:id',
	[validateToken, requestConsume],
	SucursalControllers.get
)
router.put(
	'/sucursales',
	[validateToken, requestConsume],
	SucursalControllers.update
)
router.delete(
	'/sucursales/:id',
	[validateToken, requestConsume],
	SucursalControllers.remove
)

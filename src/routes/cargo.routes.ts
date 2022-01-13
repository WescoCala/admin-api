import { Router } from 'express'
import * as CargoControllers from '../controllers/cargo.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post('/cargos', [validateToken, requestConsume], CargoControllers.save)
router.get('/cargos', [validateToken, requestConsume], CargoControllers.getAll)
router.get('/cargos/:id', [validateToken, requestConsume], CargoControllers.get)
router.put('/cargos', [validateToken, requestConsume], CargoControllers.update)
router.delete(
	'/cargos/:id',
	[validateToken, requestConsume],
	CargoControllers.remove
)

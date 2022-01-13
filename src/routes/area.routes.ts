import { Router } from 'express'
import * as AreasControllers from '../controllers/area.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post('/areas', [validateToken, requestConsume], AreasControllers.save)
router.get('/areas', [validateToken, requestConsume], AreasControllers.getAll)
router.get('/areas/:id', [validateToken, requestConsume], AreasControllers.get)
router.put('/areas', [validateToken, requestConsume], AreasControllers.update)
router.delete(
	'/areas/:id',
	[validateToken, requestConsume],
	AreasControllers.remove
)

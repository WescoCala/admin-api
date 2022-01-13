import { Router } from 'express'
import * as EmpresasControllers from '../controllers/empresas.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.post(
	'/empresas',
	[validateToken, requestConsume],
	EmpresasControllers.save
)
router.get(
	'/empresas',
	[validateToken, requestConsume],
	EmpresasControllers.getAll
)
router.get(
	'/empresas/:id',
	[validateToken, requestConsume],
	EmpresasControllers.get
)
router.put(
	'/empresas',
	[validateToken, requestConsume],
	EmpresasControllers.update
)
router.delete(
	'/empresas/:id',
	[validateToken, requestConsume],
	EmpresasControllers.remove
)

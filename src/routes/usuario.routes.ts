import { Router } from 'express'
import * as UsuarioController from '../controllers/usuario.controller'
import Middlewares from '../middleware'

const { validateToken, requestConsume } = Middlewares
export const router = Router()

router.get(
	'/usuarios/:id',
	[validateToken, requestConsume],
	UsuarioController.get
)
router.get(
	'/usaurios',
	[validateToken, requestConsume],
	UsuarioController.getAll
)
router.post(
	'/usuarios',
	[validateToken, requestConsume],
	UsuarioController.save
)
router.put(
	'/usaurios',
	[validateToken, requestConsume],
	UsuarioController.update
)
router.get(
	'/usaurio/modulo/:id',
	[validateToken, requestConsume],
	UsuarioController.getUserModule
)
router.get(
	'/usuario/modulo',
	[validateToken, requestConsume],
	UsuarioController.getUserMenu
)
router.post(
	'/usaurio/modulo',
	[validateToken, requestConsume],
	UsuarioController.addModulo
)
router.delete(
	'/usaurio/modulo',
	[validateToken, requestConsume],
	UsuarioController.removeModule
)
router.get(
	'/usaurio/seccion',
	[validateToken, requestConsume],
	UsuarioController.getUserSection
)
router.post(
	'/usaurio/seccion',
	[validateToken, requestConsume],
	UsuarioController.addSection
)
router.delete(
	'/usaurio/seccion',
	[validateToken, requestConsume],
	UsuarioController.removeSection
)
router.get(
	'/usaurio/empresa',
	[validateToken, requestConsume],
	UsuarioController.getUserEmpresa
)
router.get(
	'/usaurio/empresa/:id',
	[validateToken, requestConsume],
	UsuarioController.getUserEmpresa
)
router.post(
	'/usaurio/empresa',
	[validateToken, requestConsume],
	UsuarioController.addEmpresa
)
router.delete(
	'/usaurio/empresa',
	[validateToken, requestConsume],
	UsuarioController.removeEmpresa
)

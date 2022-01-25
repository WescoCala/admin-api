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
	'/usuarios',
	[validateToken, requestConsume],
	UsuarioController.getAll
)
router.post(
	'/usuarios',
	[validateToken, requestConsume],
	UsuarioController.save
)
router.put(
	'/usuarios',
	[validateToken, requestConsume],
	UsuarioController.update
)
router.get(
	'/usuario/modulo/:id',
	[validateToken, requestConsume],
	UsuarioController.getUserModule
)
router.get(
	'/usuario/modulo',
	[validateToken, requestConsume],
	UsuarioController.getUserMenu
)
router.post(
	'/usuario/modulo',
	[validateToken, requestConsume],
	UsuarioController.addModulo
)
router.delete(
	'/usuario/modulo',
	[validateToken, requestConsume],
	UsuarioController.removeModule
)
router.get(
	'/usuario/seccion',
	[validateToken, requestConsume],
	UsuarioController.getUserSection
)
router.post(
	'/usuario/seccion',
	[validateToken, requestConsume],
	UsuarioController.addSection
)
router.delete(
	'/usuario/seccion',
	[validateToken, requestConsume],
	UsuarioController.removeSection
)
router.get(
	'/usuario/empresa',
	[validateToken, requestConsume],
	UsuarioController.getUserEmpresa
)
router.get(
	'/usuario/empresa/:id',
	[validateToken, requestConsume],
	UsuarioController.getUserEmpresa
)
router.post(
	'/usuario/empresa',
	[validateToken, requestConsume],
	UsuarioController.addEmpresa
)
router.delete(
	'/usuario/empresa',
	[validateToken, requestConsume],
	UsuarioController.removeEmpresa
)

import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import { config } from '../config/app.config'
import sql from 'mssql'

const validateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers.access_token) {
		return res.status(403).json({
			message: 'La peticion no tiene la cabecera de autentificacion',
		})
	}

	const token = req.headers.access_token.toString().replace(/['"]+/g, '')

	try {
		const decode: any = jwt.verify(token, config.jwt_pass)
		const request = new sql.Request()

		const user = await request
			.input('userId', decode.id)
			.query(
				'select usuario from usuario where idusuario = @userId and estado = 1'
			)

		if (user.recordset.length === 0) {
			return res.status(401).json({
				message: 'Credenciales de usuario invalidas',
			})
		}

		req.headers['user'] = decode
		next()
	} catch (error) {
		console.log(error)
		return res.status(401).send({ message: 'El token no es valido' })
	}
}

export default validateToken

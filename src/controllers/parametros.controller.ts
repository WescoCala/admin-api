import sql from 'mssql'
import { Request, Response } from 'express'
import { IModulo } from './../models/modulo.schema'
import { logger } from '../config/logger'
import { config } from '../config/app.config'

class Divisas {
	save = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		const query = ``

		try {
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	get = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.params

		request.input('id', params.id)

		const query = `
            select * from dbo.getMonedaPropuesta(@id)
        `

		try {
			const result = await request.query(query)

			if (result.rowsAffected[0] === 0) {
				return res.status(204).json({
					message: 'No se encontraron los datos solicitados',
					counts: 0,
					data: params,
				})
			}

			return res.status(200).json({
				message: 'Datos encontrados con exito',
				counts: result.rowsAffected[0],
				data: result.recordset[0],
			})
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	getAll = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body

		const query = `
            select distinct currencycode, 
                dbo.getValorDivisa(currencycode) valor 
            from GP_DIVISAS
        `

		try {
			const result = await request.query(query)

			if (result.rowsAffected[0] === 0) {
				return res.status(204).json({
					message: 'No se encontraron los datos solicitados',
					counts: 0,
					data: params,
				})
			}

			return res.status(200).json({
				message: 'Datos encontrados con exito',
				counts: result.rowsAffected[0],
				data: result.recordset,
			})
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	update = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		const query = ``

		try {
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	remove = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		const query = ``

		try {
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
}

class Valores {
	save = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		const query = ``

		try {
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	get = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.params
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		request.input('id', params.id)

		const query = `
            select idvalor _id 
                ,nombre [name]
                ,monto [value]
            from GP_VALOR_PROP
            where idvalor = @id
        `

		try {
			const result = await request.query(query)

			if (result.rowsAffected[0] === 0) {
				return res.status(204).json({
					message: 'No se encontraron los datos solicitados',
					counts: 0,
					data: params,
				})
			}

			return res.status(200).json({
				message: 'Datos encontrados con exito',
				counts: result.rowsAffected[0],
				data: result.recordset,
			})
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	getAll = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		const query = `
        select idvalor _id 
            ,nombre [name]
            ,monto [value]
        from GP_VALOR_PROP
        `

		try {
			const result = await request.query(query)

			if (result.rowsAffected[0] === 0) {
				return res.status(204).json({
					message: 'No se encontraron los datos solicitados',
					counts: 0,
					data: params,
				})
			}

			return res.status(200).json({
				message: 'Datos encontrados con exito',
				counts: result.rowsAffected[0],
				data: result.recordset,
			})
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	update = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		const query = ``

		try {
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	remove = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		const query = ``

		try {
		} catch (error) {
			logger.error(error)
			return res.status(500).json({
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
}

export const DivisasController = new Divisas()
export const ValoresController = new Valores()

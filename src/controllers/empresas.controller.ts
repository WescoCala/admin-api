import sql from 'mssql'
import { Request, Response } from 'express'
import { IEmpresa } from '../models/empresa.schema'
import { logger } from '../config/logger'
import { config } from '../config/app.config'

export const save = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IEmpresa = req.body
	const user: any = req.headers['user']

	request.input('nombre', params.name)
	request.input('alias', params.alias)
	request.input('rut', params.rut)
	request.input('created', config.date)
	request.input('createdBy', user.id)

	const query = `
		insert into EMPRESAS
		(
			nombre
			,alias
			,rut
			,created
			,createdBy
		) values (
			@nombre
			,@alias
			,@rut
			,@created
			,@createdBy
		)
	`

	try {
		const result = await request.query(query)

		return res.status(201).json({
			message: 'Datos ingresados con exito',
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
export const get = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: any = req.params

	request.input('id', params.id)

	const query = `
		select _id
			,nombre [name]
			,alias
			,rut
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		from EMPRESAS
		where _id = @id
	`

	try {
		const result = await request.query(query)

		if (result.recordset.length === 0) {
			return res.status(404).json({
				message: 'No se encontraron los datos solicitados',
				counts: 0,
				data: [],
			})
		}

		return res.status(200).json({
			message: 'Datos encontrados con exito',
			counts: result.recordset.length,
			data: result.recordset,
		})
	} catch (error) {
		logger.error(error)
		return res.status(500).json({
			message: 'Error al consultar los datos',
			counts: 0,
			data: params,
			error,
		})
	}
}
export const getAll = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params = req.body

	const query = `
		select _id
			,nombre [name]
			,alias
			,rut
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		from EMPRESAS
	`

	try {
		const result = await request.query(query)

		if (result.recordset.length === 0) {
			return res.status(404).json({
				message: 'No se encontraron los datos solicitados',
				counts: 0,
				data: [],
			})
		}

		return res.status(200).json({
			message: 'Datos encontrados con exito',
			counts: result.recordset.length,
			data: result.recordset,
		})
	} catch (error) {
		logger.error(error)
		return res.status(500).json({
			message: 'Error al consultar los datos',
			counts: 0,
			data: params,
			error,
		})
	}
}
export const update = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IEmpresa = req.body
	const user: any = req.headers['user']

	request.input('id', params._id)
	request.input('nombre', params.name)
	request.input('alias', params.name)
	request.input('rut', params.name)
	request.input('updated', config.date)
	request.input('updatedBy', user.id)

	const query = `
		update EMPRESAS
		set nombre = @nombre
			,alias = @alias
			,rut = @rut
			,updated = @updated
			,updatedBy = @updatedBy
		where _id = id 
	`

	try {
		const result = await request.query(query)

		if (result.rowsAffected[0] === 0) {
			return res.status(204).json({
				message: 'Sin datos que modificar',
				counts: 0,
				data: params,
			})
		}

		return res.status(200).json({
			message: 'Datos modificados con exito',
			counts: result.rowsAffected[0],
			data: [],
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
export const remove = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: any = req.params

	request.input('id', params.id)

	const query = `
		delete from EMPRESAS where _id = @id
	`

	try {
		const result = await request.query(query)

		if (result.rowsAffected[0] === 0) {
			return res.status(204).json({
				message: 'Sin datos que eliminar',
				counts: 0,
				data: params,
			})
		}

		return res.status(200).json({
			message: 'Datos eliminados con exito',
			counts: result.rowsAffected[0],
			data: [],
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

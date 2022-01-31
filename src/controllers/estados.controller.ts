import sql from 'mssql'
import { Request, Response } from 'express'
import { IEstado } from '../models/estado.schema'
import { logger } from '../config/logger'
import { config } from '../config/app.config'

export const save = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IEstado = req.body
	const user: any = req.headers['user']

	request.input('id', params._id)
	request.input('nombre', params.name)
	request.input('activo', params.status)
	request.input('color', params.color)
	request.input('created', config.date)
	request.input('createdBy', user.id)

	const query = `
		insert into ESTADOS
		(
			id
			,nombre
			,activo
			,color
			,created
			,createdBy
		) values (
			@id
			,@nombre
			,@activo
			,@color
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
		select id _id
			,nombre [name]
			,activo [status]
			,color
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		from ESTADOS
		where id = @id
	`

	try {
		const result = await request.query(query)

		if (result.recordset.length === 0) {
			return res.status(204).json({
				message: 'No se encontraron los datos solicitados',
				counts: 0,
				data: params,
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
		select id _id
			,nombre [name]
			,activo [status]
			,color
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		from ESTADOS
	`

	try {
		const result = await request.query(query)

		if (result.recordset.length === 0) {
			return res.status(204).json({
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
	const params: IEstado = req.body
	const user: any = req.headers['user']

	request.input('id', params._id)
	request.input('nombre', params.name)
	request.input('activo', params.status)
	request.input('updated', config.date)
	request.input('updatedBy', user.id)

	const query = `
		update ESTADOS
		set nombre = @nombre
			,activo = @activo
			,color = @color
			,updated = @updated
			,updatedBy = @updatedBy
		where id = @id
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
			message: 'Error al modificar los datos',
			counts: 0,
			data: params,
			error,
		})
	}
}
export const remove = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: any = req.params.id

	request.input('id', params.id)

	const query = `
		delete from ESTADOS 
		where id = @id
	`

	try {
		const result = await request.query(query)

		if (result.rowsAffected[0] === 0) {
			return res.status(204).json({
				message: 'Sin datos que eliminar',
				counts: 0,
				data: req.params,
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
			message: 'Error al eliminar los datos',
			counts: 0,
			data: params,
			error,
		})
	}
}

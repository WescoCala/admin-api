import { config } from './../config/app.config'
import sql from 'mssql'
import { Request, Response } from 'express'
import { logger } from '../config/logger'
import { ISeccion } from '../models/seccion.schema'

export const save = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: ISeccion = req.body
	const user: any = req.headers['user']

	request.input('nombre', params.name)
	request.input('estado', params.status)
	request.input('created', config.date)
	request.input('createdBy', user.id)

	const query = `
        insert into SECCION
        (
            nombre
            ,estado
            ,created
            ,createdBy
        ) values (
             @nombre
            ,@estado
            ,@created
            ,@createdBy
        )
    `

	try {
		const seccion = await request.query(query)

		return res.status(201).json({
			message: 'Datos ingresados con exito',
			counts: seccion.rowsAffected[0],
			data: seccion.recordset[0],
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
		SELECT idseccion _id
			,nombre [name]
			,estado [state]
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		FROM SECCION
		WHERE idseccion = @id
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

export const getAll = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params = req.body

	const query = `
		SELECT idseccion _id
			,nombre [name]
			,estado [state]
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		FROM SECCION
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
	const params: ISeccion = req.body
	const user: any = req.headers['user']

	request.input('id', params._id)
	request.input('nombre', params.name)
	request.input('estado', params.status)
	request.input('updated', config.date)
	request.input('updatedBy', user.id)

	const query = `
		UPDATE SECCION
		SET nombre = @nombre
			,estado = @estado
			,updated = @updated
			,updatedBy = @updatedBy
		where idseccion = @id
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
	const params = req.body
	const user = req.headers['user']

	const query = `
		DELETE FROM SECCION
		WHERE idseccion = @id
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
			message: 'Error al eliminar los datos',
			counts: 0,
			data: params,
			error,
		})
	}
}

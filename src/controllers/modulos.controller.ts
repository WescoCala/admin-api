import sql from 'mssql'
import { Request, Response } from 'express'
import { IModulo } from './../models/modulo.schema'
import { logger } from '../config/logger'
import { config } from '../config/app.config'

export const save = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IModulo = req.body
	const user: any = req.headers['user']

	request.input('nombre', params.name)
	request.input('descripcion', params.description)
	request.input('seccion', params.seccionId)
	request.input('url', params.url)
	request.input('vista', params.visible)
	request.input('icono', params.icon)
	request.input('familia', params.familiaId)
	request.input('params', params.params)
	request.input('created', config.date)
	request.input('createdBy', user.id)

	const query = `
		insert into modulos
		( 
			nombre
			,descripcion
			,idseccion
			,url
			,vista
			,icono
			,idfamilia
			,params
			,created
			,createdBy
		) values ( 
			@nombre
			,@descirpcion
			,@seccion
			,@url
			,@vista
			,@icono
			,@familia
			,@params
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
	const params: any = req.params.id

	request.input('id', params.id)

	const query = `
		select idmodulo _id
			,nombre [name]
			,descripcion [description]
			,url
			,icono icon
			,vista visible
			,idseccion seccionId
			,dbo.getSeccionName(idseccion) seccion
			,idfamilia familiaId
			,dbo.getFamilia(idfamilia) familia
			,params
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		from MODULOS
		where idmodulo = @id
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
	const params: any = req.params

	const query = `
		select idmodulo _id
			,nombre [name]
			,descripcion [description]
			,url
			,icono icon
			,vista visible
			,idseccion seccionId
			,dbo.getSeccionName(idseccion) seccion
			,idfamilia familiaId
			,dbo.getFamilia(idfamilia) familia
			,params
			,created
			,createdBy
			,dbo.getUserName(createdBy) createdByName
			,updated
			,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		from MODULOS
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
	const params: IModulo = req.body
	const user: any = req.headers['user']

	request.input('id', params._id)
	request.input('nombre', params.name)
	request.input('descripcion', params.description)
	request.input('url', params.url)
	request.input('icono', params.icon)
	request.input('vista', params.visible)
	request.input('seccion', params.seccionId)
	request.input('familia', params.familiaId)
	request.input('updated', config.date)
	request.input('updatedBy', user.id)

	const query = `
		update MODULOS
		set nombre = @nombre
			,descripcion = @descripcion
			,url = @url
			,icono = @icono
			,vista = @vista
			,idseccion = @seccion
			,idfamilia = @familia
			,params = @params
			,updated = @updated
			,updatedBy = @updatedBy
		where idmodulo = @id 
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
		delete from modulos 
		where idmodulo = @id
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
			message: 'Error al consultar los datos',
			counts: 0,
			data: params,
			error,
		})
	}
}

import sql from 'mssql'
import { Request, Response } from 'express'
import { ITipo } from '../models/tipo.schema'
import { logger } from '../config/logger'
import { config } from '../config/app.config'

class TipoPropuesta {
	save = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: ITipo = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		request.input('nombre', params.name)
		request.input('empresa', empresaId)
		request.input('created', config.date)
		request.input('createdBy', user.id)

		const query = `
            insert into GP_TIPO_PROP
            (
                nombre
                ,empresaId
                ,created
                ,createdBy
            ) values (
                @nombre
                ,@empresa
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
	get = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.params
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		request.input('id', params.id)
		request.input('empresa', empresaId)

		const query = `
            select idtipo _id
                ,nombre [name]
                ,empresaId
                ,dbo.getEmpresaAlias(empresaId) empresa
                ,created
                ,createdBy
                ,dbo.getUserName(createdBy) createdByName
                ,updated
                ,updatedBy
                ,dbo.getUserName(updatedBy) updatedByName
            from GP_TIPO_PROP
            WHERE empresaId = @empresa
            and idtipo = @id
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

		request.input('empresa', empresaId)

		const query = `
            select idtipo _id
                ,nombre [name]
                ,empresaId
                ,dbo.getEmpresaAlias(empresaId) empresa
                ,created
                ,createdBy
                ,dbo.getUserName(createdBy) createdByName
                ,updated
                ,updatedBy
                ,dbo.getUserName(updatedBy) updatedByName
            from GP_TIPO_PROP
            WHERE empresaId = @empresa
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
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
	update = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: ITipo = req.body
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		request.input('id', params._id)
		request.input('nombre', params.name)
		request.input('updated', config.date)
		request.input('updatedBy', user.id)

		const query = `
            update GP_TIPO_PROP
            set nombre = @nombre
                ,updated = @updated
                ,updatedBy = @updatedBy
            where idtipo = @id
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
	remove = async (req: Request, res: Response) => {
		const request = new sql.Request()
		const params: any = req.params
		const user: any = req.headers['user']
		const empresaId = req.headers['empresa']

		request.input('id', params.id)

		const query = `
            delete from GP_TIPO_PROP
            where idtipo = @id
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
				message: 'Error al ingresar los datos',
				counts: 0,
				data: params,
				error,
			})
		}
	}
}

export const TipoPropuestaController = new TipoPropuesta()

import sql from 'mssql'
import { Request, Response } from 'express'
import {
	IUsuario,
	IUsuarioEmpresa,
	IUsuarioModulo,
	IUsusarioSeccion,
} from '../models/usuario.schema'
import { logger } from '../config/logger'
import { config } from '../config/app.config'
import { generatePass } from '../services/passwordGenerate'

export const save = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IUsuario = req.body
	const user: any = req.headers['user']

	if (
		params.nombre &&
		params.apellidoPaterno &&
		params.email &&
		params.password &&
		params.sexo
	) {
		if (params.sexo === 1) {
			params.img = 'i3EBGXvITVFbE419iVdxXLZY.png'
		} else {
			params.img = 'xm25N8VCIY9OFyAfavPq7GtH.png'
		}

		request.input('nombre', params.nombre)
		request.input('ap_p', params.apellidoPaterno)
		request.input('ap_m', params.apellidoMaterno)
		request.input('email', params.email)
		request.input('img', params.img)
		request.input('sexo', sql.TinyInt, params.sexo)
		request.input('usuario', params.usuario)
		request.input('payroll', params.payroll)
		request.input('area', params.areaId)
		request.input('admin', sql.TinyInt, 0)
		request.input('cargo', params.cargoId)
		request.input('estado', 1)
		request.input('sucursal', params.sucursalId)
		request.input('jefe', params.jefe)
		request.input('pass', generatePass(params.password))
		request.input('fono', params.phone)
		request.input('created', config.date)
		request.input('createdBy', user.id)

		const query = `
			insert into usuario 
			(
				nombre,
				ap_p,
				ap_m,
				email,
				pass,
				sexo,
				img,
				usaurio,
				payroll,
				area,
				admin,
				cargo,
				estado,
				sucursal,
				jefe,
				fono,
				created,
				createdby,
			) values (
				@nombre, 
				@ap_p, 
				@ap_m, 
				@email, 
				@pass, 
				@img, 
				@sexo, 
				@usuario, 
				@payroll, 
				@area, 
				@admin, 
				@cargo, 
				@estado, 
				@sucursal, 
				@jefe,
				@fono,
				@created,
				@createdBy
			)
		`

		try {
			const usaurio = await request.query(query)

			return res.status(201).json({
				message: 'Datos ingresados con exito',
				counts: usaurio.rowsAffected[0],
				data: usaurio.recordset[0],
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
	} else {
		return res.status(400).json({
			message: 'Faltan datos para realizar la accion',
			counts: 0,
			data: params,
		})
	}
}

export const get = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const id = req.params.id

	request.input('id', id)

	const query = `
        select 
			isusuario _id
			,nombre
			,ap_p apellidoPaterno
			,ap_m apellidoMaterno
			,dbo.getUserName(idusaurio) displayName
			,email
			,idsucursal sucursalId
			,dbo.getSucursal(idsucursal) sucursal
			,idarea areaId
			,dbo.getArea(idarea) area
			,idcargo cargoId
			,dbo.getCargo(idcargo) cargo
            ,created
            ,createdBy
			,dbo.getUserName(createdBy) createdByName
            ,updated
            ,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
        from 
			USUARIO
        where 
        	idusuario = @id
		
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
			message: 'Error al ejecutar la query',
			counts: 0,
			data: [],
			error,
		})
	}
}

export const getAll = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params = req.query
	const empresaId = req.headers['empresa']

	request.input('empresa', empresaId)

	const query = `
		select 
			isusuario _id
			,nombre
			,ap_p apellidoPaterno
			,ap_m apellidoMaterno
			,dbo.getUserName(idusaurio) displayName
			,email
			,idsucursal sucursalId
			,dbo.getSucursal(idsucursal) sucursal
			,idarea areaId
			,dbo.getArea(idarea) area
			,idcargo cargoId
			,dbo.getCargo(idcargo) cargo
            ,created
            ,createdBy
			,dbo.getUserName(createdBy) createdByName
            ,updated
            ,updatedBy
			,dbo.getUserName(updatedBy) updatedByName
		from
			USUARIO
		where 
			idusuario in (
				select usuarioId from USUARIO_EMPRESA where empresaId = @empresa
			) 
    `

	try {
		const result = await request.query(query)

		if (result.recordset.length === 0) {
			return res.status(404).json({
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
			message: 'Error al ejecutar la query',
			counts: 0,
			data: params,
			error,
		})
	}
}

export const update = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IUsuario = req.body
	const user: any = req.headers['user']

	request.input('id', params._id)
	request.input('nombre', params.nombre)
	request.input('ap_p', params.apellidoPaterno)
	request.input('ap_m', params.apellidoMaterno)
	request.input('email', params.email)
	request.input('img', params.img)
	request.input('sexo', sql.TinyInt, params.sexo)
	request.input('usuario', params.usuario)
	request.input('payroll', params.payroll)
	request.input('area', params.areaId)
	request.input('admin', sql.TinyInt, 0)
	request.input('cargo', params.cargoId)
	request.input('estado', 1)
	request.input('sucursal', params.sucursalId)
	request.input('jefe', params.jefe)
	request.input('fono', params.phone)
	request.input('updated', config.date)
	request.input('updatedBy', user.id)

	const query = `
		UPDATE USUARIO
		SET
			nombre = @nombre,
			ap_p = @ap_p,
			ap_m = @ap_m,
			email = @email,
			sexo = @sexo,
			usuario = @usuario,
			payroll = @payroll,
			idarea = @area,
			idcargo = @cargo,
			idsucursal = @sucursal,
			jefe = @jefe,
			estado = @estado,
			admin = @admin,
			updated = @updated,
			updatedBy = @updatedBy
		WHERE idusuario = @id
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
	const params = req.query

	request.input('solicitudId', params.solicitudId)
	request.input('id', params._id)

	const query = `
        delete from GA_DETALLE_SOLICITUD
        where 
			idsolicitud = @solicitudId
			and iddetalle = @id
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

export const addModulo = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IUsuarioModulo = req.body
	const user: any = req.headers['user']
	const empresaId = req.headers['empresa']

	request.input('id', params._id)
	request.input('modulo', params.moduloId)
	request.input('vista', params.view)
	request.input('empresa', empresaId)
	request.input('created', config.date)
	request.input('createdBy', user.id)

	const query = `
		insert into MODULO_USUARIO
		(
			idusuario,
			idmodulo,
			vista,
			empresaId,
			created,
			createdBy
		) values (
			@id,
			@modulo,
			@vista,
			@empresa,
			@created,
			@createdBy
		)
	`

	try {
		const moduloUsuario = await request.query(query)

		return res.status(201).json({
			message: 'Datos ingresados con exito',
			counts: moduloUsuario.rowsAffected[0],
			data: moduloUsuario.recordset[0],
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

export const getUserModule = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const id = req.params.id
	const empresaId = req.headers['empresa']

	request.input('id', id)
	request.input('empresa', empresaId)

	const query = `
		select m.idmodulo moduloId 
			, m.nombre modulo
			, m.url
			, m.icono icon
			, dbo.getFamilia(m.idfamilia) familia
			, mu.vista [view]
			, mu.empresaId empresaId
		from MODULOS m
		left join MODULO_USUARIO mu on mu.idmodulo = m.idmodulo
		and mu.idusuario = @id and mu.empresaId = @empresa
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
			message: 'Error al ejecutar la query',
			counts: 0,
			data: [],
			error,
		})
	}
}

export const addSection = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IUsusarioSeccion = req.body
	const user: any = req.headers['user']
	const empresaId = req.headers['empresa']

	request.input('empresa', empresaId)
	request.input('seccion', params.seccionId)
	request.input('user', params._id)
	request.input('created', config.date)
	request.input('createdBy', user.id)

	const query = `
		INSERT INTO SECCION_USUARIO 
		(
			idseccion,
			idusuario,
			empresaId,
			created,
			createdBy
		) VALUES (
			@seccion
			,@user
			,@empresa
			,@created
			,@createdBy
		)
	`

	try {
		const seccionUsuario = await request.query(query)

		return res.status(201).json({
			message: 'Datos ingresados con exito',
			counts: seccionUsuario.rowsAffected[0],
			data: seccionUsuario.recordset[0],
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

export const getUserSection = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const id = req.params.id
	const empresaId = req.headers['empresa']

	request.input('id', id)
	request.input('empresa', empresaId)

	const query = `
		select idseccion seccionId
			,dbo.getSeccionName(idseccion) seccion
			,idusuario _id
			,empresaId 
		from SECCION_USUARIO 
		where idusuario = @id
		and empresaId = @empresa
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
			message: 'Error al ejecutar la query',
			counts: 0,
			data: {
				id,
			},
			error,
		})
	}
}

export const getUserMenu = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params = req.body
	const user: any = req.headers['user']
	const empresaId = req.headers['empresa']

	let menu: IUsusarioSeccion[] = []

	request.input('empresa', empresaId)
	request.input('user', user.id)

	const query = `
		select idseccion seccionId
			,dbo.getSeccionName(idseccion) seccion
			,idusuario _id
			,empresaId 
		from SECCION_USUARIO 
		where idusuario = @user
		and empresaId = @empresa
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

		result.recordset.forEach(async (seccion) => {
			const modulo = await request.input('seccion', seccion.seccionId).query(`
				select m.idmodulo moduloId 
					  ,m.nombre modulo
					  ,m.url
					  ,m.icono icon
					  ,dbo.getFamilia(m.idfamilia) familia
					  ,mu.vista [view]
					  ,mu.empresaId empresaId
				from MODULOS m
					left join MODULO_USUARIO mu on mu.idmodulo = m.idmodulo
				where mu.idusuario = @user and mu.empresaId = @empresa and idseccion = @seccion
				`)

			menu.push({
				...seccion,
				modulos: modulo.recordset,
			})
		})

		return res.status(200).json({
			message: 'Datos encontrados con exito',
			counts: result.recordset.length,
			data: menu,
		})
	} catch (error) {
		logger.error(error)
		return res.status(500).json({
			message: 'Error al ejecutar la query',
			counts: 0,
			data: params,
			error,
		})
	}
}

export const removeSection = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params = req.body
	const user = req.headers['user']
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

export const updateModule = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IUsuarioModulo = req.body
	const user: any = req.headers['user']
	const empresaId = req.headers['empresa']

	request.input('empresa', empresaId)
	request.input('modulo', params.moduloId)
	request.input('vista', params.view)
	request.input('modulo', params.moduloId)
	request.input('user', params._id)
	request.input('updated', config.date)
	request.input('updatedBy', user.id)

	const query = `
		update MODULO_USUARIO
		set vista = @vista,
			updatedBy = @updatedBy,
			updated = @updated
		where empresaId = @empresa 
		and idusuario = @user 
		and idmodulo = @modulo
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

export const removeModule = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params = req.body
	const user: any = req.headers['user']
	const empresaId = req.headers['empresa']

	request.input('empresa', empresaId)
	request.input('id', user.id)

	const query = `
		delete from MODULO_USUARIO where idusuario = @id and empresaId = @empresa
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

export const addEmpresa = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params: IUsuarioEmpresa = req.body
	const user: any = req.headers['user']

	request.input('id', params._id)
	request.input('empresa', params.empresaId)
	request.input('created', config.date)
	request.input('createdBy', user.id)

	const query = `
		insert into USUARIO_EMPRESA
		(
			usuarioId,
			empresaId,
			created,
			createdBy
		) values (
			@id,
			@empresa,
			@created,
			@createdBy
		)
	`

	try {
		const moduloUsuario = await request.query(query)

		return res.status(201).json({
			message: 'Datos ingresados con exito',
			counts: moduloUsuario.rowsAffected[0],
			data: moduloUsuario.recordset[0],
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

export const getUserEmpresa = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const user: any = req.headers['user']

	const id = req.params.id || user.id

	request.input('id', id)

	const query = `
		select e._id empresaId
			,e.alias empresa
			,case ISNULL(ue.usuarioId, 0)
				when 0 then 0
				else 1 end [status]
		from EMPRESAS e
		left join USUARIO_EMPRESA ue 
			on ue.empresaId = e._id and ue.usuarioId = @id 
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
			message: 'Error al ejecutar la query',
			counts: 0,
			data: {
				id,
			},
			error,
		})
	}
}

export const removeEmpresa = async (req: Request, res: Response) => {
	const request = new sql.Request()
	const params = req.body
	const user: any = req.headers['user']
	const empresaId = req.headers['empresa']

	request.input('empresa', empresaId)
	request.input('id', user.id)

	const query = `
		delete from USUARIO_EMPRESA where usuarioId = @id and empresaId = @empresa
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

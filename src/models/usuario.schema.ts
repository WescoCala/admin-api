export interface IUsuario {
	_id?: number
	nombre: string
	apellidoPaterno: string
	apellidoMaterno?: string
	usuario: string
	displayName?: string
	admin?: boolean
	email: string
	password?: string
	img?: string
	sexo: number
	payroll?: string
	sucursalId: number
	sucursal?: string
	cargoId: number
	cargo?: string
	areaId: number
	area?: string
	estado: boolean
	jefe?: number
	phone?: string
	created?: Date
	createdBy?: number
	createdByName?: string
	updated?: Date
	updatedBy?: number
	updatedByName?: string
}

export interface IUsuarioModulo {
	_id?: number
	moduloId: number
	name?: string
	description?: string
	url?: string
	icon?: string
	familia?: string
	view: number
	params?: string
	empresaId: number
	vision?: boolean
}

export interface IUsuarioEmpresa {
	_id?: number
	empresaId: number
	empresa?: string
	status?: boolean
}

export interface IUsusarioSeccion {
	_id: number
	seccionId: number
	name?: string
	empresaId: number
	modulos?: IUsuarioModulo[]
}

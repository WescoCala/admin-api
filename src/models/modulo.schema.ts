export interface IModulo {
	_id?: number
	name: string
	description: string
	url?: string
	icon?: string
	visible?: boolean
	seccionId: number
	seccion?: string
	familiaId: number
	familia?: string
	params?: string
	created?: Date
	createdBy?: number
	createdByName?: string
	updated?: Date
	updatedBy?: number
	updatedByName?: string
}

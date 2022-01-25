import { remove } from './../controllers/usuario.controller'
export interface IRequest {
	save(): void
	get(): void
	getAll(): void
	update(): void
	remove(): void
}

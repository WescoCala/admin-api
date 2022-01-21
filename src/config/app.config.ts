import * as dotenv from 'dotenv'
import moment from 'moment'
moment.locale('es-mx')
dotenv.config()

export const config = {
	mongodb: {
		server: process.env.MONGO_CNN,
		db: process.env.MONGO_DB,
		auth: {
			user: '',
			pass: '',
		},
	},
	sqlsrv: {
		server: String(process.env.SQL_SERVER),
		db: String(process.env.SQL_DB),
		auth: {
			user: String(process.env.SQL_USER),
			pass: String(process.env.SQL_PASS),
		},
	},
	server: {
		port: process.env.PORT || 8080,
	},
	jwt_pass: process.env.JWT_SECRET || 'pass',
	date: new Date(moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')),
}

export interface IUser {
	id: number
	usuario: string
	email: string
}

export const forEachAsync = async (array: Array<any>, callback: Function) => {
	for (let i = 0; i < array.length; i++) {
		await callback(array[i], i, array)
	}
}

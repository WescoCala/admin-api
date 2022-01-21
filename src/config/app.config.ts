import * as dotenv from 'dotenv'
import moment from 'moment'
moment.locale('es-mx')
dotenv.config()

export const config = {
	mongodb: {
		server: process.env.MONGO_CNN || 'mongodb://localhost:27017/',
		db: process.env.MONGO_DB || 'adinet',
		auth: {
			user: '',
			pass: '',
		},
	},
	sqlsrv: {
		server: process.env.SQL_SERVER || '192.168.10.164',
		db: process.env.SQL_DB || 'ADINET',
		auth: {
			user: process.env.SQL_USER || 'admadinet',
			pass: process.env.SQL_PASS || '123456Aa',
		},
	},
	server: {
		port: process.env.PORT || 8080,
	},
	jwt_pass: process.env.JWT_SECRET || 'b^YZ8FTLtYV5mWva',
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

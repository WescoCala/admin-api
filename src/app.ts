import express from 'express'
import { config } from './config/app.config'

export default class Server {
	public app: express.Application
	public port: number

	constructor() {
		this.app = express()
		this.port = Number(config.server.port)
	}

	start(callback: Function) {
		this.app.listen(this.port, callback())
	}
}

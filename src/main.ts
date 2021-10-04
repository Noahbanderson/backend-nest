import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import dotenv from 'dotenv'
import firebaseAdmin from 'firebase-admin'
import helmet from 'helmet'
import csurf from 'csurf'

import { Process } from 'config/config.types'

import { AppModule } from 'app.module'
import { WorkerAppModule } from 'worker/worker.app.module'

import firebaseConfig from '../firebase.config.json'

dotenv.config()

firebaseAdmin.initializeApp({
	...firebaseConfig.params,
	credential: firebaseAdmin.credential.cert(firebaseConfig.cert),
})

async function api() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const isProduction = process.env.NODE_ENV === 'prod'
	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		whitelist: true,
	// 		transform: true,
	// 		enableDebugMessages: !isProduction,
	// 		skipMissingProperties: false,
	// 		disableErrorMessages: isProduction,
	// 	}),
	// )

	app.setGlobalPrefix('v1')
	if (isProduction) {
		app.use(helmet())
		app.use(csurf())
	}

	await app.listen(3001, '0.0.0.0')
}

async function worker() {
	const app = await NestFactory.create<NestExpressApplication>(WorkerAppModule, {
		// httpsOptions
	})
	await app.listen(3002, '0.0.0.0')
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
async function repl() {}

async function main() {
	;({
		api: () => api(),
		worker: () => worker(),
		repl: () => repl(),
	}[process.env.PROCESS as Process]())
}

main()

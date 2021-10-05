import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import dotenv from 'dotenv'
import firebaseAdmin from 'firebase-admin'
import helmet from 'helmet'
import csurf from 'csurf'
// import compression from 'compression'

import repl from './repl'

import { Process } from 'config/config.types'

import { AppLogger } from 'logger'

import { AppModule } from 'app.module'
import { WorkerAppModule } from 'worker/worker.app.module'

import firebaseConfig from '../firebase.config.json'

dotenv.config({ path: `./config/${process.env.ENV}.env` })

firebaseAdmin.initializeApp({
	...firebaseConfig.params,
	credential: firebaseAdmin.credential.cert(firebaseConfig.cert),
})

async function api() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })

	const isProduction = process.env.NODE_ENV === 'prod'

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Every DTO needs to have class-validator decorators
			transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
			// Need for ParseIntPipe is negated as class-transformer will perform conversion
			enableDebugMessages: !isProduction,
			skipMissingProperties: false, // If set to true, validator will skip validation of all properties that are missing in the validating object.
			disableErrorMessages: isProduction,
		}),
	)

	app.setGlobalPrefix('v1')

	if (isProduction) {
		app.use(helmet())
		app.use(csurf())
		// app.use(compression());
	}

	const port = process.env.PORT ?? '3333'

	await app.listen(port, '0.0.0.0')

	AppLogger.log(`Backend now listening on port: ${port}`)
}

async function worker() {
	const app = await NestFactory.create<NestExpressApplication>(WorkerAppModule, {
		// httpsOptions
	})
	await app.listen(3002, '0.0.0.0')
}

async function main() {
	;({
		api: () => api(),
		worker: () => worker(),
		repl: () => repl(),
	}[process.env.PROCESS as Process]())
}

main()

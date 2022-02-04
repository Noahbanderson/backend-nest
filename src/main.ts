import path from 'path'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import dotenv from 'dotenv'
import * as ClassValidator from 'class-validator'
import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/typeorm'
import helmet from 'helmet'
import csurf from 'csurf'
// import compression from 'compression'

import repl from './repl'

import { Process } from 'config/config.types'

import { AppLogger } from 'logger'

import { AppModule } from 'app.module'
import { WorkerAppModule } from 'worker/worker.app.module'

dotenv.config({ path: path.join(__dirname, '..', `config/${process.env.ENV}.env`) })

Resource.validate = ClassValidator.validate
AdminJS.registerAdapter({ Database, Resource })

declare const module: any

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

	const port = __dirname.includes('dist') ? parseInt(process.env.PORT ?? '3333') : 4444

	await app.listen(port, '0.0.0.0')

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}

	AppLogger.log(`Backend now listening on port: ${port}`)
}

async function worker() {
	const app = await NestFactory.create<NestExpressApplication>(WorkerAppModule, {
		// httpsOptions
	})

	const port = __dirname.includes('dist') ? 3334 : 4443

	await app.listen(port, '0.0.0.0')

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}

	AppLogger.log(`Worker now listening on port: ${port}`)
}

async function main() {
	const processTypes = {
		api: () => api(),
		worker: () => worker(),
		repl: () => repl(),
	}

	processTypes[process.env.PROCESS as Process]()
}

main()

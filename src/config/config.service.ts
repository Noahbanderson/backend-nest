import path from 'path'
import dotenv from 'dotenv'
import { Inject, Injectable } from '@nestjs/common'

import { ConfigOptions, EnvConfig } from './config.types'
import { KeyRegistry } from './constants'

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig

	constructor(@Inject(KeyRegistry.CONFIG_OPTIONS_KEY) options: ConfigOptions) {
		// Check if application env variables have been loaded
		if (!process.env.PORT) {
			// If not, load the env file
			dotenv.config({
				path: path.resolve(
					process.env.INIT_CWD || __dirname + '../../',
					options.folder,
					`${process.env.NODE_ENV || 'dev'}.env`,
				),
			})
		}

		this.envConfig = process.env as EnvConfig
	}

	get(key: keyof EnvConfig) {
		return this.envConfig[key]
	}
}

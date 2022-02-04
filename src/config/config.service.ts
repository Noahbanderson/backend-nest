import { Inject, Injectable } from '@nestjs/common'
import dotenv from 'dotenv'
import path from 'path'
import { ConfigOptions, EnvConfig } from './config.types'
import { KeyRegistry } from './constants'

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig

	constructor(@Inject(KeyRegistry.CONFIG_OPTIONS_KEY) options: ConfigOptions) {
		dotenv.config({
			path: path.join(__dirname, options.folder, `${process.env.ENV}.env`),
		})
		this.envConfig = process.env as EnvConfig
	}

	get(key: keyof EnvConfig) {
		return this.envConfig[key]
	}
}

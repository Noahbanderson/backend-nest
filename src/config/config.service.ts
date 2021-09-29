import { Inject, Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { ConfigOptions, EnvConfig } from './config.types'
import { KeyRegistry } from './constants'

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig

	constructor(@Inject(KeyRegistry.CONFIG_OPTIONS_KEY) options: ConfigOptions) {
		const filePath = `${process.env.NODE_ENV || 'dev'}.env`
		const envFile = path.resolve(__dirname, '../../', options.folder, filePath)
		this.envConfig = dotenv.parse(fs.readFileSync(envFile)) as EnvConfig
	}

	get(key: keyof EnvConfig) {
		return this.envConfig[key]
	}
}

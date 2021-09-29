import { DynamicModule, Global, Module } from '@nestjs/common'

import { ConfigService } from './config.service'
import { KeyRegistry } from './constants'

export interface ConfigModuleOptions {
	folder: string
}

@Global()
@Module({})
export class ConfigModule {
	static register(options: ConfigModuleOptions): DynamicModule {
		return {
			module: ConfigModule,
			providers: [
				{
					provide: KeyRegistry.CONFIG_OPTIONS_KEY,
					useValue: options,
				},
				ConfigService,
			],
			exports: [ConfigService],
		}
	}
}

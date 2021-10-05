import { DynamicModule, Global, Module } from '@nestjs/common'

import { KeyRegistry } from './constants'

import { ConfigService } from './config.service'
import { TypeOrmConfigService, BullConfigService } from './services'

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
				TypeOrmConfigService,
				BullConfigService,
			],
			exports: [ConfigService, TypeOrmConfigService, BullConfigService],
		}
	}
}

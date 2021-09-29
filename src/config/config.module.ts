import { DynamicModule, Global, Module } from '@nestjs/common'

import { ConfigService } from './config.service'
import { KeyRegistry } from './constants'

import { TypeOrmConfigService, BullConfigService, GqlConfigService } from './services'

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
				GqlConfigService,
			],
			exports: [ConfigService, TypeOrmConfigService, BullConfigService, GqlConfigService],
		}
	}
}

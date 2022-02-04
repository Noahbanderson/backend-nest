import { Injectable } from '@nestjs/common'

import { ConfigService } from 'config/config.service'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	/** Remember to update the {@link WorkerAppModule#TypeOrmModule} config */
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres' as const,
			host: this.configService.get('PG_HOST'),
			port: 5432,
			username: this.configService.get('PG_USERNAME'),
			password: this.configService.get('PG_PASSWORD'),
			database: this.configService.get('PG_DATABASE'),
			synchronize: process.env.NODE_ENV !== 'prod',
			logging: true,
			keepConnectionAlive: true,
			migrationsRun: true,
			autoLoadEntities: true,
			migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
		}
	}
}

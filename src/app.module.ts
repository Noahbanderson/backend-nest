import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { APP_GUARD } from '@nestjs/core'

import { ConfigModule } from 'config/config.module'
import { ConfigService } from 'config/config.service'

import { FirebaseAuthGuard, FirebaseAuthStrategy, AuthorizationModule } from 'security'

import { JobsModule } from 'worker/jobs/jobs.module'

import { UserModule } from 'api/user/user.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [
		ConfigModule.register({ folder: '../config' }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) =>
				({
					type: 'postgres' as const,
					host: configService.get('PG_HOST'),
					port: 5432,
					username: configService.get('PG_USERNAME'),
					password: configService.get('PG_PASSWORD'),
					database: configService.get('PG_DATABASE'),
					synchronize: process.env.NODE_ENV !== 'prod',
					logging: true,
					migrationsRun: true,
					autoLoadEntities: true,
					migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
				} as TypeOrmModuleOptions),
		}),
		BullModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				redis: {
					host: configService.get('REDIS_HOST'),
				},
			}),
		}),
		JobsModule,
		UserModule,
		AuthorizationModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		UserModule, // For FirebaseAuthStrategy dependencies
		FirebaseAuthStrategy,
		{
			provide: APP_GUARD,
			useClass: FirebaseAuthGuard,
		},
	],
})
export class AppModule {}

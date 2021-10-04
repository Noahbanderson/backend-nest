import { join } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { GraphQLModule } from '@nestjs/graphql'
import { APP_GUARD } from '@nestjs/core'

import { AppLogger } from 'logger'

import { ConfigModule } from 'config/config.module'
import { ConfigService } from 'config/config.service'

import { FirebaseAuthGuard, FirebaseAuthStrategy, AuthorizationModule } from 'security'

import { JobsModule } from 'worker/jobs/jobs.module'

import { DateScalar } from 'graphql/date.scalar'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UserModule } from 'api/user/user.module'
import { PantryModule } from './api/pantry/pantry.module'

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
		GraphQLModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
				sortSchema: true,
				debug: configService.get('NODE_ENV') !== 'prod',
				playground: configService.get('NODE_ENV') !== 'prod',
				useGlobalPrefix: true,
				logger: new AppLogger(),
				plugins: [
					{
						async requestDidStart({ logger, request }) {
							logger.debug(request.query)
							logger.debug(request.variables)
							// return {
							//   willSendResponse({logger, response}) {
							//     logger.debug(JSON.stringify(response, null, 2))
							//     return
							//   },
							// }
						},
					},
				],
			}),
		}),
		JobsModule,
		AuthorizationModule,
		UserModule,
		PantryModule,
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
		DateScalar,
	],
})
export class AppModule {}

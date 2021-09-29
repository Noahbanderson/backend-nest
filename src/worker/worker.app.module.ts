import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { BullModule } from '@nestjs/bull'

import { ConfigModule } from 'config/config.module'
import { ConfigService } from 'config/config.service'

import { QueueModule } from './queue/queue.module'
import { JobsModule } from './jobs/jobs.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		BullModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				redis: {
					host: configService.get('REDIS_HOST'),
				},
			}),
		}),
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
					autoLoadEntities: true,
					synchronize: process.env.NODE_ENV !== 'production',
				} as TypeOrmModuleOptions),
		}),
		QueueModule,
		JobsModule,
	],
	// controllers: [AppController],
	// providers: [AppService],
})
export class WorkerAppModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { AdminModule } from '@adminjs/nestjs'

import { adminFactory } from 'admin/admin.factory'

import { ConfigModule, BullConfigService, TypeOrmConfigService } from 'config'

import {
	AuthenticationModule,
	AuthorizationModule,
	JwtAuthAppGuardProvider,
} from 'security'

import { JobsModule } from 'worker/jobs/jobs.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

// ---- API ---- \\
import { UserModule } from 'api/user'

@Module({
	imports: [
		ConfigModule.register({ folder: 'config' }),
		TypeOrmModule.forRootAsync({ useExisting: TypeOrmConfigService }),
		BullModule.forRootAsync({ useExisting: BullConfigService }),
		AdminModule.createAdminAsync(adminFactory),
		JobsModule, // Allows the all Job Handlers to be injected into services and enqueue jobs
		AuthenticationModule,
		AuthorizationModule,
		// ---- API ---- \\
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtAuthAppGuardProvider, // Global guard i.e. everything is JWT protected (unless otherwise declared)
	],
})
export class AppModule {}

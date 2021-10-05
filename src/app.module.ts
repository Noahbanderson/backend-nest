import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'

import { ConfigModule, BullConfigService, TypeOrmConfigService } from 'config'

import {
	FirebaseAuthStrategy,
	AuthorizationModule,
	FirebaseAuthAppGuardProvider,
} from 'security'

import { JobsModule } from 'worker/jobs/jobs.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

// ---- API ---- \\
import { UserModule } from './api/user/user.module'

@Module({
	imports: [
		ConfigModule.register({ folder: '../config' }),
		TypeOrmModule.forRootAsync({ useExisting: TypeOrmConfigService }),
		BullModule.forRootAsync({ useExisting: BullConfigService }),
		JobsModule, // Allows the all Job Handlers to be injected into services and enqueue jobs
		AuthorizationModule,
		// ---- API ---- \\
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		UserModule, // For FirebaseAuthStrategy dependencies
		FirebaseAuthStrategy, // Used by global guard
		FirebaseAuthAppGuardProvider, // Global guard
	],
})
export class AppModule {}

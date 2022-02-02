import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { AdminModule } from '@adminjs/nestjs'

// import { adminFactory } from 'admin/admin.factory'

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
import { UserModule, User } from 'api/user'

@Module({
	imports: [
		ConfigModule.register({ folder: '../config' }),
		TypeOrmModule.forRootAsync({ useExisting: TypeOrmConfigService }),
		BullModule.forRootAsync({ useExisting: BullConfigService }),
		JobsModule, // Allows the all Job Handlers to be injected into services and enqueue jobs
		AuthorizationModule,
		// AdminModule.createAdminAsync({
		// 	imports: [TypeOrmModule.forFeature([User])],
		// 	...adminFactory, // your factory
		// }),

		AdminModule.createAdmin({
			adminJsOptions: {
				resources: [User],
				rootPath: '/admin',
			},
		}),
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

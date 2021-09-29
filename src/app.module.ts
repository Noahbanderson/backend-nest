import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { GraphQLModule } from '@nestjs/graphql'

import {
	ConfigModule,
	GqlConfigService,
	BullConfigService,
	TypeOrmConfigService,
} from 'config'

import {
	FirebaseAuthStrategy,
	AuthorizationModule,
	FirebaseAuthAppGuardProvider,
} from 'security'

import { JobsModule } from 'worker/jobs/jobs.module'

import { DateScalar } from 'graphql/date.scalar'

import { AppController } from './app.controller'
import { AppService } from './app.service'

// ---- API ---- \\
import { UserModule } from './api/user/user.module'
import { PantryModule } from './api/pantry/pantry.module'

@Module({
	imports: [
		ConfigModule.register({ folder: '../config' }),
		TypeOrmModule.forRootAsync({ useExisting: TypeOrmConfigService }),
		BullModule.forRootAsync({ useExisting: BullConfigService }),
		GraphQLModule.forRootAsync({ useExisting: GqlConfigService }),
		JobsModule, // Allows the all Job Handlers to be injected into services and enqueue jobs
		AuthorizationModule,
		// ---- API ---- \\
		UserModule,
		PantryModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		UserModule, // For FirebaseAuthStrategy dependencies
		FirebaseAuthStrategy, // Used by global guard
		FirebaseAuthAppGuardProvider, // Global guard
		DateScalar, // Registers Date scalar with Apollo Gql
	],
})
export class AppModule {}

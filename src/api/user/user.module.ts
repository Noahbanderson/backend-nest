import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JobsModule } from 'worker/jobs/jobs.module'

import { AuthorizationModule } from 'security/authorization/authorization.module'

import { UserController } from './user.controller'
import { UserRepository } from './repositories/user.repository'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository]), JobsModule, AuthorizationModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [TypeOrmModule.forFeature([UserRepository]), UserService],
})
export class UserModule {}

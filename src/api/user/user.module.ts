import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JobsModule } from 'worker/jobs/jobs.module'

import { AuthorizationModule } from 'security/authorization/authorization.module'

import { UserController } from './user.controller'
import { UserRepository } from './repositories/user.repository'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository]), JobsModule, AuthorizationModule],
	controllers: [UserController],
	providers: [UserService, UserResolver],
	exports: [TypeOrmModule.forFeature([UserRepository]), UserService],
})
export class UserModule {}

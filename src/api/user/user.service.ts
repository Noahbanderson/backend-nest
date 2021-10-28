import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MyFirstJobHandler } from 'worker/jobs/handlers/my-first.handler'

import { CheckPolicies } from 'decorators/check-policies.decorator'

import { UserPolicyManager } from './policies'
import { UserRepository } from './repositories'
import { CreateUserInput, UpdateUserInput } from './dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private myFirstJob: MyFirstJobHandler,
	) {}

	async foo() {
		await this.myFirstJob.enqueue({ customerId: 1 })
		return { success: true }
	}

	// @CheckPolicies(UserPolicyManager.create) -- Cloud Fn's
	async create(createUserInput: CreateUserInput) {
		return await this.userRepository.create(createUserInput).save()
	}

	@CheckPolicies(UserPolicyManager.manage)
	findAll() {
		return `This action returns all user`
	}

	@CheckPolicies(UserPolicyManager.read)
	async findOne(uid: string) {
		return await this.userRepository.findOne(uid)
	}

	@CheckPolicies(UserPolicyManager.update)
	update(uid: string, _updateUserInput: UpdateUserInput) {
		return `This action updates a #${uid} user`
	}

	@CheckPolicies(UserPolicyManager.delete)
	remove(uid: string) {
		return `This action removes a #${uid} user`
	}
}

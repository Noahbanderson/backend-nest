import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MyFirstJobHandler } from 'worker/jobs/handlers/my-first.handler'

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

	async create(createUserInput: CreateUserInput) {
		return await this.userRepository.create(createUserInput).save()
	}

	findAll() {
		return `This action returns all user`
	}

	async findOne(uid: string) {
		return await this.userRepository.findOne(uid)
	}

	update(uid: string, _updateUserInput: UpdateUserInput) {
		return `This action updates a #${uid} user`
	}

	remove(uid: string) {
		return `This action removes a #${uid} user`
	}
}

import { Injectable } from '@nestjs/common'

import { CreateUserDto, UpdateUserDto } from '../user/dto'

import { MyFirstJobHandler } from 'worker/jobs/handlers/my-first.handler'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private myFirstJob: MyFirstJobHandler,
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.userRepository.create(createUserDto).save()
		return { success: true }
	}

	findAll() {
		return `This action returns all user`
	}

	async findOne(uid: string) {
		return await this.userRepository.findOne(uid)
	}

	update(token: string, updateUserDto: UpdateUserDto) {
		console.log(updateUserDto)
		return `This action updates a #${token} user`
	}

	remove(token: string) {
		return `This action removes a #${token} user`
	}

	async foo() {
		await this.myFirstJob.enqueue({ customerId: 1 })
		return { success: true }
	}
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MyFirstJobHandler } from 'worker/jobs/handlers/my-first.handler'

import { CreateUserDto, UpdateUserDto } from '../user/dto'

import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
		private readonly myFirstJob: MyFirstJobHandler,
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.userRepository.create(createUserDto).save()
		return { success: true }
	}

	findAll() {
		return `This action returns all user`
	}

	async findById(id: string) {
		return await this.userRepository.findById(id)
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email } })
		return user ?? null
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

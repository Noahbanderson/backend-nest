import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { IsPublic } from 'decorators/is-public.decorator'

import { CreateUserDto, UpdateUserDto } from './dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@IsPublic()
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@Get()
	findAll() {
		this.userService.foo()
		return this.userService.findAll()
	}

	@Get(':token')
	findOne(@Param('token') token: string) {
		return this.userService.findOne(token)
	}

	@Patch(':token')
	update(@Param('token') token: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(token, updateUserDto)
	}

	@Delete(':token')
	remove(@Param('token') token: string) {
		return this.userService.remove(token)
	}
}

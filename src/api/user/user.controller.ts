import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CheckPolicies } from 'decorators/check-policies.decorator'

import { CreateUserDto, UpdateUserDto } from './dto'
import { UserPolicyManager } from './policies/user.policy'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// @CheckPolicies(UserPolicyManager.create)
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@CheckPolicies(UserPolicyManager.manage)
	@Get()
	findAll() {
		this.userService.foo()
		return this.userService.findAll()
	}

	@CheckPolicies(UserPolicyManager.read)
	@Get(':token')
	findOne(@Param('token') token: string) {
		return this.userService.findOne(token)
	}

	@CheckPolicies(UserPolicyManager.update)
	@Patch(':token')
	update(@Param('token') token: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(token, updateUserDto)
	}

	@CheckPolicies(UserPolicyManager.delete)
	@Delete(':token')
	remove(@Param('token') token: string) {
		return this.userService.remove(token)
	}
}

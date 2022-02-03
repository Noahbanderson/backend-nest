import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { CheckPolicies } from 'decorators/check-policies.decorator'

import { UpdateUserDto } from './dto'
import { UserPolicyManager } from './policies/user.policy'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// Use the auth/sign-up endpoint to register new users

	@CheckPolicies(UserPolicyManager.manage)
	@Get()
	findAll() {
		this.userService.foo()
		return this.userService.findAll()
	}

	@CheckPolicies(UserPolicyManager.read)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findById(id)
	}

	@CheckPolicies(UserPolicyManager.update)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto)
	}

	@CheckPolicies(UserPolicyManager.delete)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(id)
	}
}

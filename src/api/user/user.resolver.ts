import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'

import { User } from './entities'
import { UserService } from './user.service'
import { CreateUserInput, UpdateUserInput } from './dto'
import { CheckPolicies } from 'decorators/check-policies.decorator'
import { UserPolicyManager } from './policies'
import { IsPublic } from 'decorators/is-public.decorator'

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@IsPublic()
	@Mutation(() => User)
	createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		console.log(createUserInput)
		console.log('HIT')
		return { email: 'noahbanderson@gmail.com' }
		// return this.userService.create(createUserInput)
	}

	@CheckPolicies(UserPolicyManager.manage)
	@Query(() => [User], { name: 'user' })
	findAll() {
		return this.userService.findAll()
	}

	@CheckPolicies(UserPolicyManager.read)
	@Query(() => User, { name: 'user' })
	findOne(@Args('uid', { type: () => ID }) uid: string) {
		return this.userService.findOne(uid)
	}

	@CheckPolicies(UserPolicyManager.update)
	@Mutation(() => User)
	updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
		return this.userService.update(updateUserInput.uid, updateUserInput)
	}

	@CheckPolicies(UserPolicyManager.delete)
	@Mutation(() => User)
	removeUser(@Args('uid', { type: () => ID }) uid: string) {
		return this.userService.remove(uid)
	}
}

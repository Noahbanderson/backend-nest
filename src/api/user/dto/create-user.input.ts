import { InputType, Field, ID } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
	/** pk provided by firebase */
	@Field(() => ID)
	@IsNotEmpty()
	@IsString()
	uid: string

	@IsNotEmpty()
	@MaxLength(100)
	firstName: string

	@IsNotEmpty()
	@MaxLength(100)
	lastName: string

	@IsNotEmpty()
	@IsEmail()
	email: string
}

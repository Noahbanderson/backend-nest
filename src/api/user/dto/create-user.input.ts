import { InputType, Field, ID } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
	/** pk provided by firebase */
	@Field(() => ID)
	@IsNotEmpty()
	@IsString()
	uid: string

	@IsNotEmpty()
	@IsEmail()
	email: string
}

import { MaxLength, IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {
	@IsNotEmpty()
	uid: string

	@MaxLength(100)
	@IsNotEmpty()
	lastName: string

	@IsEmail()
	email: string

	@MaxLength(100)
	@IsNotEmpty()
	firstName: string
}

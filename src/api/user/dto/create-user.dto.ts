import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {
	@IsNotEmpty()
	uid: string

	@IsEmail()
	email: string
}

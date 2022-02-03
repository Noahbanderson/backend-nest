import { IsNotEmpty, IsEmail } from 'class-validator'

export class SignUpDto {
	@IsEmail()
	email: string

	@IsNotEmpty()
	password: string
}

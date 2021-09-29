import { MaxLength, IsNotEmpty, IsEmail, IsOptional } from 'class-validator'

export class CreateUserDto {
	@MaxLength(100)
	@IsNotEmpty()
	@IsOptional()
	lastName?: string

	@IsEmail()
	@IsOptional()
	email?: string

	@MaxLength(100)
	@IsNotEmpty()
	@IsOptional()
	firstName?: string
}

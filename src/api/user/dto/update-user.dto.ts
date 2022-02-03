import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'

import { CreateUserDto } from '.'

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsNotEmpty()
	id: string
}

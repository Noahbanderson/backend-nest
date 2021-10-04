import { InputType, Field, ID, PartialType } from '@nestjs/graphql'

import { CreateUserInput } from '.'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
	@Field(() => ID)
	uid: string
}

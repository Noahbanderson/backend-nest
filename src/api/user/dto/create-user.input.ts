import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
	/** pk provided by firebase */
	@Field(() => ID)
	uid: string

	@Field()
	firstName: string

	@Field()
	lastName: string

	@Field()
	email: string
}

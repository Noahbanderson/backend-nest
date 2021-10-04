import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreatePantryInput {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number
}

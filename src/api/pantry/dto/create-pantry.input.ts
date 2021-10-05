import { InputType, Int, Field } from '@nestjs/graphql'
import { Max } from 'class-validator'

@InputType()
export class CreatePantryInput {
	/** Example field (placeholder) */
	@Max(10)
	@Field(() => Int)
	exampleField: number
}

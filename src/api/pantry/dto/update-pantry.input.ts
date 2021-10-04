import { CreatePantryInput } from './create-pantry.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePantryInput extends PartialType(CreatePantryInput) {
	@Field(() => Int)
	id: number
}

import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Pantry {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number
}

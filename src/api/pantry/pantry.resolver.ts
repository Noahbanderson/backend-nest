import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { PantryService } from './pantry.service'
import { Pantry } from './entities/pantry.entity'
import { CreatePantryInput } from './dto/create-pantry.input'
import { UpdatePantryInput } from './dto/update-pantry.input'
import { IsPublic } from 'decorators/is-public.decorator'

@Resolver(() => Pantry)
export class PantryResolver {
	constructor(private readonly pantryService: PantryService) {}

	@Mutation(() => Pantry)
	@IsPublic()
	createPantry(@Args('createPantryInput') createPantryInput: CreatePantryInput) {
		console.log('createPantryInput', createPantryInput)
		console.log('createPantryInput.exampleField', createPantryInput.exampleField)
		return this.pantryService.create(createPantryInput)
	}

	@Query(() => [Pantry], { name: 'pantry' })
	findAll() {
		return this.pantryService.findAll()
	}

	@IsPublic()
	@Query(() => Pantry, { name: 'pantry' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		console.log(id)
		return this.pantryService.findOne(id)
	}

	@Mutation(() => Pantry)
	updatePantry(@Args('updatePantryInput') updatePantryInput: UpdatePantryInput) {
		return this.pantryService.update(updatePantryInput.id, updatePantryInput)
	}

	@Mutation(() => Pantry)
	removePantry(@Args('id', { type: () => Int }) id: number) {
		return this.pantryService.remove(id)
	}
}

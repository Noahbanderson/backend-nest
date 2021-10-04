import { Injectable } from '@nestjs/common'
import { CreatePantryInput } from './dto/create-pantry.input'
import { UpdatePantryInput } from './dto/update-pantry.input'

@Injectable()
export class PantryService {
	create(_createPantryInput: CreatePantryInput) {
		return 'This action adds a new pantry'
	}

	findAll() {
		return `This action returns all pantry`
	}

	findOne(id: number) {
		return `This action returns a #${id} pantry`
	}

	update(id: number, _updatePantryInput: UpdatePantryInput) {
		return `This action updates a #${id} pantry`
	}

	remove(id: number) {
		return `This action removes a #${id} pantry`
	}
}

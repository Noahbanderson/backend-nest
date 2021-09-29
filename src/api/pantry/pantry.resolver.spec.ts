import { Test, TestingModule } from '@nestjs/testing'
import { PantryResolver } from './pantry.resolver'
import { PantryService } from './pantry.service'

describe('PantryResolver', () => {
	let resolver: PantryResolver

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PantryResolver, PantryService],
		}).compile()

		resolver = module.get<PantryResolver>(PantryResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})
})

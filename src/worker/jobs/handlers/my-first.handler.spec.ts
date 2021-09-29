import { Test, TestingModule } from '@nestjs/testing'
import { MyFirstJobHandler } from './my-first.handler'

describe('MyFirstJobHandler', () => {
	let provider: MyFirstJobHandler

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MyFirstJobHandler],
		}).compile()

		provider = module.get<MyFirstJobHandler>(MyFirstJobHandler)
	})

	it('should be defined', () => {
		expect(provider).toBeDefined()
	})
})

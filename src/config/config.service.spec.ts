import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from './config.service'
import { KeyRegistry } from './constants'

jest.mock('dotenv')
jest.mock('fs')

describe('ConfigService', () => {
	let service: ConfigService

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			providers: [
				ConfigService,
				{
					provide: KeyRegistry.CONFIG_OPTIONS_KEY,
					useValue: {
						folder: 'config',
					},
				},
			],
		}).compile()

		service = moduleRef.get<ConfigService>(ConfigService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})

import { Module } from '@nestjs/common'
import { PantryService } from './pantry.service'
import { PantryResolver } from './pantry.resolver'

@Module({
	providers: [PantryResolver, PantryService],
})
export class PantryModule {}

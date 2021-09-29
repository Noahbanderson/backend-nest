import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { MyFirstJobHandler } from './handlers/my-first.handler'

/**
 * MAKE SURE TO RE-EXPORT HANDLERS
 */
@Module({
	imports: [BullModule.registerQueue({ name: 'worker' })],
	providers: [MyFirstJobHandler],
	exports: [MyFirstJobHandler],
})
export class JobsModule {}

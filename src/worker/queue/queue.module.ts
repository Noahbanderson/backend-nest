import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { JobsModule } from 'worker/jobs/jobs.module'

import { QueueProcessor } from './queue.processor'

@Module({
	imports: [BullModule.registerQueue({ name: 'worker' }), JobsModule],
	providers: [QueueProcessor],
})
export class QueueModule {}

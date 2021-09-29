import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { JobOptions, Queue } from 'bull'

import { JobHandler } from 'worker/jobs/jobs.types'

export interface MyFirstJobHandlerPayload {
	customerId: number
}

const name = 'my-first-job'

@Injectable()
export class MyFirstJobHandler implements JobHandler<MyFirstJobHandlerPayload> {
	static readonly JOB_NAME = name

	constructor(@InjectQueue('worker') private readonly workerQueue: Queue) {}

	private readonly logger = new Logger(MyFirstJobHandler.name)
	readonly jobName = MyFirstJobHandler.JOB_NAME

	async enqueue(data: MyFirstJobHandlerPayload, options?: JobOptions) {
		return await this.workerQueue.add(this.jobName, data, options)
	}

	async process(data: MyFirstJobHandlerPayload) {
		this.logger.debug('Start transcoding...')
		this.logger.debug(data)
		this.logger.debug('Transcoding completed')
	}
}

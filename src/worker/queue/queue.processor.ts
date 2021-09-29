import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'

import { MyFirstJobHandler } from 'worker/jobs/handlers/my-first.handler'

@Processor('worker')
export class QueueProcessor {
	constructor(private readonly myFirstJobHandler: MyFirstJobHandler) {}

	@Process(MyFirstJobHandler.JOB_NAME)
	processMyFirstJobHandler(job: Job) {
		this.myFirstJobHandler.process(job.data)
	}
}

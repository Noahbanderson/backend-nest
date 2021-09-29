import { JobOptions } from 'bull'

export interface JobHandler<T> {
	readonly jobName: string
	// static readonly JOB_NAME: string;
	enqueue: (_payload: T, _options?: JobOptions) => Promise<any>
	process: (_payload: T) => Promise<any>
}

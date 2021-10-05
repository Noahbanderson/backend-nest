import { Logger as NestLogger } from '@nestjs/common'

export class AppLogger extends NestLogger {
	info(message?: any) {
		super.log(message, super.context)
	}
}

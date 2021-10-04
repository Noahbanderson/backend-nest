import { Logger as NestLogger } from '@nestjs/common'
import { Logger as ApolloLogger } from 'apollo-server-types'

export class AppLogger extends NestLogger implements ApolloLogger {
	info(message?: any) {
		super.log(message, super.context)
	}
}

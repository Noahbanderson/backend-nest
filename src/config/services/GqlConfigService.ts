import { join } from 'path'
import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'

import { AppLogger } from 'logger'

import { ConfigService } from 'config/config.service'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createGqlOptions(): GqlModuleOptions {
		return {
			autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
			sortSchema: true,
			debug: this.configService.get('NODE_ENV') !== 'prod',
			playground: this.configService.get('NODE_ENV') !== 'prod',
			useGlobalPrefix: true,
			logger: new AppLogger(),
			plugins: [
				{
					async requestDidStart({ logger, request }) {
						logger.debug(request.query)
						logger.debug(request.variables)
						// return {
						//   willSendResponse({logger, response}) {
						//     logger.debug(JSON.stringify(response, null, 2))
						//     return
						//   },
						// }
					},
				},
			],
		}
	}
}

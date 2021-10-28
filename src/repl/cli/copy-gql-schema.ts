import fs from 'fs'

import { Logger } from '@nestjs/common'

/** Assumptions:
 * 1) the mobile project is a sibling to this app
 * 2) you have generated your schema file and are ready to copy it to the mobile app
 * */
export function copyGqlSchema(target: string[]) {
	const logger = new Logger()
	if (target[0] === 'mobile') {
		fs.copyFileSync('src/generated/schema.gql', '../mobile/graphql/schema.gql')
		logger.log('Successfully copied schema file to mobile app!')
	}
}

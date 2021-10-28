import { AppLogger } from 'logger'

import cli from './cli'

// * Import whatever you would like to run

const logger = new AppLogger()

async function doStuff() {
	// * Use your imports here!
}

/** arguments can be passed via cli with the addition of ` -- <foo>` to your repl command
 *
 * @example
 * ```bash
 * # will copy schema.gql into sister mobile repository
 * $ npm run repl -- copy-gql-schema mobile
 * ```
 */
export default function repl() {
	logger.log('Running REPL')

	new Promise(async () => {
		try {
			// For repl cli commands, run the arguments through the cli options
			const argv = JSON.parse(process.env.npm_config_argv ?? '{"remain": []}').remain
			if (argv.length > 0) {
				logger.debug(JSON.stringify(argv))
				await cli(argv)
			} else {
				await doStuff()
			}
		} catch (error) {
			logger.error(error)
		}
	}).finally(() => process.exit(0))
}

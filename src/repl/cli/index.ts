import { copyGqlSchema } from './copy-gql-schema'

export default async function cli(args: string[]) {
	const rootCommandMap: mapCommandToFunction = {
		'copy-gql-schema': nextArgs => copyGqlSchema(nextArgs),
		// * Register new commands here!
	}

	// check if command exists
	if (Object.keys(rootCommandMap).includes(args[0])) {
		// find the function correlating the first argument and pass all but the first argument to the handler
		await rootCommandMap[args[0]](args.slice(1))
	} else {
		throw new Error(`Command: [${args[0]}] does not exist in the rootCommand map.`)
	}
}

type mapCommandToFunction = {
	[key: string]: (nextArgs: string[]) => Promise<void> | void
}

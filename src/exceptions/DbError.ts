export class DB_Error extends Error {
	constructor(...params: any) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params)

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) Error.captureStackTrace(this, DB_Error)

		this.name = 'DB_Error'
		this.message = 'DB_Error: ' + params[0]
		// Custom debugging information
		// this.foo = foo
		// this.date = new Date()
	}
}

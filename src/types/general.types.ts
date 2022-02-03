import { Request } from 'express'

import { User } from 'api/user'

export type AppRequest = Request & {
	user: User
}

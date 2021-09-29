import { Request as Req } from 'express'
import firebaseAdmin from 'firebase-admin'

import { User } from 'api/user/entities/user.entity'

export type AppRequest = Req & {
	user: User & {
		firebaseUser: firebaseAdmin.auth.DecodedIdToken
	}
}

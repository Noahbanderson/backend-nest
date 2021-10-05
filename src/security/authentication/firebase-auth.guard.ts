import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql'

import { KeyRegistry } from 'config/constants'

@Injectable()
export class FirebaseAuthGuard extends AuthGuard(KeyRegistry.FIREBASE_AUTH_KEY) {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext) {
		// Watch for an when a route has been declared public via `@IsPublic` and ignore Firebase Authentication
		const isPublic = this.reflector.getAllAndOverride<boolean>(KeyRegistry.PUBLIC_KEY, [
			context.getHandler(), // Method: final say
			context.getClass(), // Controller: default
		])

		if (isPublic) return true

		if ((context.getType() as GqlContextType) === 'graphql') {
			// ! BUG: context.getArgByIndex(0) does not return IncomingRequest,
			// !			it is found at context.getArgByIndex(2).req
			// ! Rearranging values in array to satisfy the JWT auth used in super.canActivate

			// Force args[0] to be IncomingRequest
			const newContext: any = GqlExecutionContext.create(context)
			newContext.args[0] = newContext.getArgByIndex(2).req

			return super.canActivate(newContext)
		}

		return super.canActivate(context)
	}
}

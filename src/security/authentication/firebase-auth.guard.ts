import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
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

		return super.canActivate(context)
	}
}

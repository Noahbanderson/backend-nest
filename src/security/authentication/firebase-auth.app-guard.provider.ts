import { APP_GUARD } from '@nestjs/core'

import { FirebaseAuthGuard } from './firebase-auth.guard'

// Global guard to be used across the whole application, for every controller, route handler, and resolver.
export class FirebaseAuthAppGuardProvider {
	static readonly provide = APP_GUARD
	static readonly useClass = FirebaseAuthGuard
}

import { APP_GUARD } from '@nestjs/core'

import { JwtAuthGuard } from '../guards/jwt-auth.guard'

// Global guard to be used across the whole application, for every controller, route handler, and resolver.
export class JwtAuthAppGuardProvider {
	static readonly provide = APP_GUARD
	static readonly useClass = JwtAuthGuard
}

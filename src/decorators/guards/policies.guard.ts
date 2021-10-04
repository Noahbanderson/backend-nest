import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { KeyRegistry } from 'config/constants'
import { CaslAbilityFactory, AppAbility, PolicyHandler } from 'security/authorization'
import { GqlExecutionContext } from '@nestjs/graphql'

import { AppRequest } from 'types/general.types'

@Injectable()
export class PoliciesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private caslAbilityFactory: CaslAbilityFactory,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const policyHandlers =
			this.reflector.get<PolicyHandler[]>(
				KeyRegistry.CHECK_POLICIES_KEY,
				context.getHandler(),
			) || []

		const ctx = GqlExecutionContext.create(context)
		const { user } = ctx.getArgByIndex(2).req as AppRequest
		// const ability = await this.caslAbilityFactory.createForUserFirebase(user.firebaseUser)
		const ability = await this.caslAbilityFactory.createForUser(user)

		return policyHandlers.every(handler => this.execPolicyHandler(handler, ability))
	}

	private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
		if (typeof handler === 'function') return handler(ability)
		return handler.handle(ability)
	}
}

import {
	Injectable,
	CanActivate,
	ExecutionContext,
	BadRequestException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { KeyRegistry } from 'config/constants'
import { CaslAbilityFactory, AppAbility, PolicyHandler } from 'security/authorization'
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql'

import { AppRequest } from 'types/general.types'
import { User } from 'api/user/entities'

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

		const type = context.getType() as GqlContextType

		let user: User

		if (type === 'graphql') {
			user = (GqlExecutionContext.create(context).getArgByIndex(2).req as AppRequest).user
		} else if (type === 'http') {
			user = context.switchToHttp().getRequest<AppRequest>().user
		} else {
			throw new BadRequestException(
				`Unknown context type: ${type}. Expecting: http | ws | rpc | graphql`,
			)
		}

		// const ability = await this.caslAbilityFactory.createForUserFirebase(user.firebaseUser)
		const ability = await this.caslAbilityFactory.createForUser(user)

		return policyHandlers.every(handler => this.execPolicyHandler(handler, ability))
	}

	private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
		if (typeof handler === 'function') return handler(ability)
		return handler.handle(ability)
	}
}

import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { KeyRegistry } from 'config/constants'
import { PolicyHandler } from 'security/authorization'

import { PoliciesGuard } from './guards/policies.guard'

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
	applyDecorators(
		UseGuards(PoliciesGuard),
		SetMetadata(KeyRegistry.CHECK_POLICIES_KEY, handlers),
	)

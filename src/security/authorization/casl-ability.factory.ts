import { Injectable } from '@nestjs/common'
import { Ability, ExtractSubjectType, AbilityBuilder, AbilityClass } from '@casl/ability'

import { User } from 'api/user'

import { Action, AppAbility, Subjects } from '.'

@Injectable()
export class CaslAbilityFactory {
	async createForUser(user: User) {
		const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
			Ability as AbilityClass<AppAbility>,
		)

		can(Action.Read, User, { id: user.id })

		// can(Action.Update, Article, { authorId: user.id })
		// cannot(Action.Delete, Article, { isPublished: true })

		if (user.isAdmin) can(Action.Manage, 'all')

		return build({
			// Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
			detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
		})
	}
}

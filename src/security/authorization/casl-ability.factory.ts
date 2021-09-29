import { Injectable, Logger } from '@nestjs/common'
import { Ability, ExtractSubjectType, AbilityBuilder, AbilityClass } from '@casl/ability'
import { auth, database } from 'firebase-admin'

import { User } from 'api/user/entities/user.entity'

import { Action, AppAbility, Subjects } from '.'

@Injectable()
export class CaslAbilityFactory {
	async createForUser(user: User) {
		const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
			Ability as AbilityClass<AppAbility>,
		)

		can(Action.Read, User, { uid: user.uid })

		// can(Action.Update, Article, { authorId: user.id })
		// cannot(Action.Delete, Article, { isPublished: true })

		if (user.isAdmin) can(Action.Manage, 'all')

		return build({
			// Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
			detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
		})
	}

	async createForUserFirebase(user: auth.DecodedIdToken) {
		const claims: any[] = await new Promise(resolve => {
			try {
				database()
					.ref(`/claims/${user.uid}`)
					.on('value', snapshot => resolve(snapshot.val()))
			} catch (error) {
				Logger.error(error)
				resolve([])
			}
		})

		console.log(claims)

		return new Ability(claims, {
			detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
		}) as AppAbility
	}
}

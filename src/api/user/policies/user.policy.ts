import { Action, AppAbility } from 'security/authorization'
import { User } from '../entities/user.entity'

export class UserPolicyManager {
	static manage = (ability: AppAbility) => ability.can(Action.Manage, User)
	static read = (ability: AppAbility) => ability.can(Action.Read, User)
	static create = (ability: AppAbility) => ability.can(Action.Create, User)
	static update = (ability: AppAbility) => ability.can(Action.Update, User)
	static delete = (ability: AppAbility) => ability.can(Action.Delete, User)
}

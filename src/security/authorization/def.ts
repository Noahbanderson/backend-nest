import { Ability, InferSubjects } from '@casl/ability'
import { User } from 'api/user/entities/user.entity'

export enum Action {
	Manage = 'manage',
	Create = 'create',
	Read = 'read',
	Update = 'update',
	Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all'
// type Subjects = InferSubjects<typeof Article | typeof User> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

export type PolicyHandler = PolicyHandlerClass | PolicyHandlerCallback

export interface PolicyHandlerClass {
	handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean

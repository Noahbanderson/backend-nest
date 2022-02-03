import {
	Entity,
	Column,
	BaseEntity,
	UpdateDateColumn,
	CreateDateColumn,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { IsEmail } from 'class-validator'
import { ResourceWithOptions } from 'adminjs'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@IsEmail()
	@Column({ unique: true, nullable: false })
	email: string

	@Column({ name: 'encrypted_password', nullable: false })
	encryptedPassword: string

	@Column('bool', { name: 'is_admin', default: false, nullable: false })
	isAdmin: boolean

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date
}

export const User_AdminResource: ResourceWithOptions = {
	resource: User,
	options: {},
}

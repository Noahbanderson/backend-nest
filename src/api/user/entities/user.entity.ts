import {
	Entity,
	Column,
	BaseEntity,
	UpdateDateColumn,
	CreateDateColumn,
	PrimaryColumn,
} from 'typeorm'
import { IsEmail } from 'class-validator'

@Entity()
export class User extends BaseEntity {
	@PrimaryColumn({ unique: true, nullable: false })
	uid: string

	@IsEmail()
	@Column({ unique: true, nullable: false })
	email: string

	@Column('bool', { name: 'is_admin', default: false, nullable: false })
	isAdmin: boolean

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date
}

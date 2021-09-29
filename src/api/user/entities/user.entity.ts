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

	@Column({ nullable: false })
	firstName: string

	@Column({ nullable: false })
	lastName: string

	@IsEmail()
	@Column({ unique: true, nullable: false })
	email: string

	@Column('bool', { default: false, nullable: false })
	isAdmin: boolean

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}

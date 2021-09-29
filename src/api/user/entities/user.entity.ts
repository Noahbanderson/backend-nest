import {
	Entity,
	Column,
	BaseEntity,
	UpdateDateColumn,
	CreateDateColumn,
	PrimaryColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@ObjectType()
@Entity()
export class User extends BaseEntity {
	/** pk provided by firebase */
	@Field(() => ID)
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

	@Field(() => Date)
	@CreateDateColumn()
	created_at: Date

	@Field(() => Date)
	@UpdateDateColumn()
	updated_at: Date
}

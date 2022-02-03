import { EntityRepository, Repository } from 'typeorm'

import { DB_Error } from 'exceptions/DbError'

import { User } from '../entities/user.entity'

/** An extensible class that can execute custom commands */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findById(id: string) {
		try {
			const query = await this.query(
				`
        SELECT * 
        FROM public.user 
        WHERE id = $1;`,
				[id],
			)
			const result = query[0] as User

			return this.create(result)
		} catch (error) {
			throw new DB_Error(error.message)
		}
	}
}

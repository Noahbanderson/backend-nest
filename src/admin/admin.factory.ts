import { AdminModuleFactory } from '@adminjs/nestjs/types/interfaces/admin-module-factory.interface'
import { CurrentAdmin } from 'adminjs'
import { Connection } from 'typeorm'
import { User } from 'api/user'

// import * as bcrypt from 'bcrypt';

export const adminFactory: AdminModuleFactory = {
	useFactory: (connection: Connection) => ({
		adminJsOptions: {
			databases: [connection],
			// resources: [UserEntity] // this too works, you dont need to inject the repository, just import
			rootPath: '/admin',
		},
		auth: {
			authenticate: async (email, _password) => {
				const userRep = connection.getRepository(User)
				const user = await userRep.findOne({ email })

				// const isValid = await bcrypt.compare(password, user.password);
				// if (!isValid) return;

				return user as unknown as CurrentAdmin
			},
			cookieName: 'some-secret-password',
			cookiePassword: 'some-secret-password',
		},
	}),
	inject: [Connection],
}

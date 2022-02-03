import { AdminModuleFactory } from '@adminjs/nestjs/types/interfaces/admin-module-factory.interface'

import { AuthenticationModule, AuthenticationService } from 'security'

import { User } from 'api/user'

export const adminFactory: AdminModuleFactory = {
	imports: [AuthenticationModule],
	inject: [AuthenticationService],
	useFactory: ({ validateLocal: authenticate }: AuthenticationService) => ({
		auth: {
			authenticate,
			cookieName: 'some-secret-password',
			cookiePassword: 'some-secret-password',
		},
		adminJsOptions: {
			rootPath: '/admin',
			branding: {
				companyName: 'Pantry',
			},
			resources: [User],
		},
	}),
}

import { AdminModuleFactory } from '@adminjs/nestjs/types/interfaces/admin-module-factory.interface'

import { AuthenticationModule, AuthenticationService } from 'security'

import { User } from 'api/user'
import { ConfigModule, ConfigService } from 'config'

export const adminFactory: AdminModuleFactory = {
	imports: [AuthenticationModule, ConfigModule],
	inject: [AuthenticationService, ConfigService],
	useFactory: (authService: AuthenticationService, configService: ConfigService) => ({
		auth: {
			authenticate: async (email, password) => {
				const user = await authService.validateLocal(email, password)

				if (user?.isAdmin ?? false) return user

				return null
			},
			cookieName: 'nest-admin',
			cookiePassword: configService.get('ADMIN_COOKIE_SECRET'),
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

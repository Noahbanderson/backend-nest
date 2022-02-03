import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy as LocalPassportStrategy } from 'passport-local'

import { User } from 'api/user'

import { AuthenticationService } from '../authentication.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(LocalPassportStrategy) {
	constructor(private readonly authService: AuthenticationService) {
		super()
	}

	async validate(username: string, password: string): Promise<User> {
		const user = await this.authService.validateLocal(username, password)

		if (!user) throw new UnauthorizedException()

		return user
	}
}

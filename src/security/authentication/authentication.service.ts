import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from 'bcryptjs'

import { AppRequest } from 'types/general.types'

import { User, UserService } from 'api/user'

import { SignUpDto } from './dto/sign-up.dto'
import { JwtPayloadCustomProperties } from './strategies/jwt.strategy'
import { ConfigService } from 'config'
import { AppLogger } from 'logger'

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {
		// For some reason, the context of `validateLocal` gets cleared, not sure why.
		this.validateLocal = this.validateLocal.bind(this)
	}

	private readonly logger = new AppLogger(AuthenticationService.name)

	/** called by the Local Auth Guard */
	async validateLocal(email: string, password: string): Promise<User | null> {
		const user = await this.userService.findByEmail(email)

		const isValid = await bcryptjs
			.compare(password, user?.encryptedPassword ?? '')
			.catch(err => {
				this.logger.error(err)
				return false
			})

		return isValid ? user : null
	}

	/** Receives the non-null value returned from  {@link AuthenticationService.validateLocal} */
	async login(user: AppRequest['user']) {
		return {
			access_token: this.jwtService.sign(
				{
					id: user.id,
					// email: user.email,
				} as JwtPayloadCustomProperties,
				{ secret: this.configService.get('JWT_SECRET') },
			),
		}
	}

	async signUp(body: SignUpDto) {
		const salt = 10
		const hash = await bcryptjs.hash(body.password, salt)
		try {
			return await this.userService.create({
				email: body.email,
				encryptedPassword: hash,
			})
		} catch (error) {
			throw new BadRequestException(error.message)
		}
	}
}

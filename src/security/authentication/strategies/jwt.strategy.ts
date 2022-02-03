import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { ConfigService } from 'config'
import { UserService } from 'api/user'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	/** For documentation read the *whole* section
	 *
	 * @see https://docs.nestjs.com/security/authentication#implementing-passport-jwt
	 */
	async validate(payload: JwtPayload) {
		return await this.userService.findById(payload.id)
	}
}

export type JwtPayloadCustomProperties = {
	id: string
	// email: string
}

type JwtPayload = {
	iat: number
	exp: number
} & JwtPayloadCustomProperties

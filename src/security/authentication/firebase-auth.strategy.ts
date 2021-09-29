import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-firebase-jwt'
import { auth } from 'firebase-admin'
import { KeyRegistry } from 'config/constants'
import { UserService } from 'api/user/user.service'

// prettier-ignore
@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, KeyRegistry.FIREBASE_AUTH_KEY) {
	constructor(private userService: UserService) {
		super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() })
	}

	async validate(token: string) {
		const firebaseUser = await auth()
			.verifyIdToken(token, true)
			.catch((err: any) => {
				console.log(err)
				throw new UnauthorizedException(err.message)
			})
		if (!firebaseUser) throw new UnauthorizedException()
		const user = await this.userService.findOne(firebaseUser.uid)
		
		// this object will be set to the user property on the Request object
		return { ...user, firebaseUser }
	}
}

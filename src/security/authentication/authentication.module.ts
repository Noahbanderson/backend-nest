import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from 'api/user'

import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigModule, ConfigService } from 'config'

@Module({
	imports: [
		UserModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '1d' },
			}),
		}),
	],
	controllers: [AuthenticationController],
	providers: [AuthenticationService, LocalStrategy, JwtStrategy],
	exports: [AuthenticationService],
})
export class AuthenticationModule {}

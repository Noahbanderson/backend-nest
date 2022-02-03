import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common'

import { AppRequest } from 'types/general.types'
import { IsPublic } from 'decorators/is-public.decorator'

import { SignUpDto } from './dto/sign-up.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

import { AuthenticationService } from './authentication.service'

@Controller('auth')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@IsPublic() // Needed to get around the global jwt guard
	@UseGuards(LocalAuthGuard) // Use a different guard
	@Post('login')
	async login(@Request() req: AppRequest) {
		return this.authenticationService.login(req.user)
	}

	@IsPublic()
	@Post('sign-up')
	async signUp(@Body() body: SignUpDto) {
		return this.authenticationService.signUp(body)
	}
}

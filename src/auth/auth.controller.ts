import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { GoogleService } from './social-logins/google.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @Post('login')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    return this.authService.login(loginBody);
  }

  @Post('register')
  handleRegistry(@Body() userBody: RegisterAuthDto) {
    return this.authService.register(userBody);
  }

  @Post('google-auth')
  async googleAuth(
    @Body('token') token: string,
    @Res({ passthrough: true }) request: Request,
  ) {
    return this.googleService.googleAuth(token, request);
  }

}

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { MaintainerRegisterAuthDto } from './dto/maintainer-register-dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { GoogleService } from './social-logins/google.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) { }

  @Post('login')
  handleLogin(
    @Body() loginBody: LoginAuthDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(loginBody, response);
  }

  @Post('register')
  handleRegistry(@Body() userBody: RegisterAuthDto) {
    return this.authService.register(userBody);
  }

  @Get('refresh')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.refresh(request, response);
  }

  @Post('maintainer/register')
  handleMaintainerRegistry(
    @Body() userBody: MaintainerRegisterAuthDto
  ) {
    return this.authService.registryFromMaintainer(userBody);
  }

  @Post('google-auth')
  async googleAuth(
    @Body('token') token: string,
    @Res({ passthrough: true }) request: Request,
  ) {
    return this.googleService.googleAuth(token, request);
  }

}

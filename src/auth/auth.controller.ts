import { 
  Body,
  Controller, 
  Post, 
  UseGuards 
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {RegisterAuthDto} from './dto/register-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('register')
  registerUser(@Body() registryObject: RegisterAuthDto) {
    this.authService.registerUser(registryObject);
  }
}

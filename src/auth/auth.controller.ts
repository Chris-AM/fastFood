import { 
  Body,
  Controller, 
  Post, 
  UseGuards 
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { plainToHash } from './utils/handleBCrypt';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    return this.authService.login(loginBody); 
  }

  @Post('register')
  handleRegistry(@Body() userBody: RegisterAuthDto) {
    return this.authService.register(userBody);
  }
}

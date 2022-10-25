import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { RoleAgentGuard } from '../common/guards/role-agent.guard';
import { JwtAgentGuard } from '../common/guards/jwt-agent.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../common/media.handler';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
@UseGuards(JwtAgentGuard, RoleAgentGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @Role(['manager'])
  createUser(@Body() userDto: UserDTO) {
    return this.userService.createUser(userDto);
  }

  @Get()
  @HttpCode(200)
  @Role(['manager', 'admin'])
  @UseInterceptors(CacheInterceptor)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  @Role(['manager', 'admin'])
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post('upload/:id')
  @HttpCode(201)
  @Role(['user', 'admin', 'manager'])
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(id, file.filename);
  }

  @Put(':id')
  @HttpCode(200)
  @Role(['manager', 'admin', 'user'])
  updateUser(@Param('id') id: string, @Body() userDto: UserDTO) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Role(['manager', 'admin'])
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

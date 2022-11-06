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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RoleAgentGuard } from '../common/guards/role-agent.guard';
import { JwtAgentGuard } from '../common/guards/jwt-agent.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../common/media.handler';
import { Response } from 'express';
import { of } from 'rxjs';
import { join } from 'path';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PaginationQuery } from 'src/common/decorators/pagination.decorator';
@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['manager'])
  createUser(@Body() userDto: UserDTO) {
    return this.userService.createUser(userDto);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['manager', 'admin'])
  @UseInterceptors(CacheInterceptor)
  getAllUsers(@PaginationQuery() pagination: any) {
    return this.userService.getAllUsers(pagination);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['manager', 'admin'])
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post('upload/:id')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('photo', { storage }))
  uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(id, file.filename);
  }

  @Get('avatar/:filename')
  @HttpCode(200)
  getAvatar(@Param('filename') filename: string, @Res() res: Response) {
    return of(res.sendFile(join(process.cwd(), './public/' + filename)));
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDTO,
    @Res() response: Response,
  ) {
    return this.userService.updateUser(id, userDto, response);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAgentGuard, RoleAgentGuard)
  @Role(['manager', 'admin'])
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

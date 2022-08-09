import { Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put 
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController { 
  
  constructor(private readonly userService: UserService){}
  
  @Post()
  createUser(@Body() userDto: UserDTO){
    return this.userService.createUser(userDto);
  }

  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserByID(@Param('id') id: string){
    return this.userService.getUserByID(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDTO){
    return this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.userService.deleteUser(id);
  } 
}

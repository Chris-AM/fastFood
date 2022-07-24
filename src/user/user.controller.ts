import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
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
}

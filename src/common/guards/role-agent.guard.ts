import {
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleAgentGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
  
    const getRoleMetaData = this.reflector
      .get<string>('role', context.getHandler());
    const req = context.getArgByIndex(0)
    const {role}  = req.user;
    console.log(role);
    const isAllowed = role.some((rol) => 
      getRoleMetaData.includes(rol));
    if(!isAllowed) 
      throw new HttpException(
        'do not have the permissions', HttpStatus.UNAUTHORIZED
      )
    console.log('isAllowed ===> ', isAllowed);
    return isAllowed;
  }
  
}

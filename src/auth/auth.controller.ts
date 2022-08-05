import {Controller, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";

@ApiTags('auth')
@Controller( 'auth' )
export class AuthController{
  constructor(private authService: AuthService){ }

  @Post( 'signup' )
  signup() {
    this.authService.signup();
    return {
      ok: true,
      msg: 'im in'
    }
  }
  
  @Post( 'signin' )
  signin() {

  }
}

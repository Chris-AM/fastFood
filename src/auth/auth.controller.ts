import {Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";

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

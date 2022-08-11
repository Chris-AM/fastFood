import { 
  CanActivate, 
  ExecutionContext, 
  Injectable 
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BearerAgentGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.getArgByIndex(0);
    const auth = req.headers['authorization']
    return true;
  }
}

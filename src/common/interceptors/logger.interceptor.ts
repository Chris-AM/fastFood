import { 
  CallHandler, 
  ExecutionContext, 
  Injectable, 
  NestInterceptor 
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any> {
    const [req, res] = context.getArgs();
    console.log('req ===>', req.params);
    return next.handle()
      .pipe(
        tap((value) => console.log(`response ${value}`))
      )
  }
}

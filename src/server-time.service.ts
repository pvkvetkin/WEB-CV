import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerTime implements NestInterceptor {
  intercept(
    executionContext: ExecutionContext,
    callHandler: CallHandler,
  ): Observable<string> {
    const startingTime = performance.now();
    return callHandler.handle().pipe(
      map((data) => {
        const context = executionContext.switchToHttp().getResponse();
        const endingTime = performance.now();
        context.cookie(
          'cookieLoadTime',
          (endingTime - startingTime).toFixed(2).toString(),
        );
        return data;
      }),
    );
  }
}

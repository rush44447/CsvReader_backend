import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof HttpException) {
          const exception = data as HttpException;
          const status = exception.getStatus();
          const message = exception.message || 'Internal Server Error';

          return {
            responseBody: {
              errorMessage: "Something went wrong",
            },
            responseCode: status,
            message,
          };
        } else {
          // Handle successful responses
          return {
            responseBody: data,
            responseCode: 200,
          };
        }
      }),
    );
  }
}

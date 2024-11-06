import {
   CallHandler,
   ExecutionContext,
   HttpException,
   HttpStatus,
   Injectable,
   NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
   private httpAdapter: AbstractHttpAdapter;

   constructor(adapterHost: HttpAdapterHost) {
      this.httpAdapter = adapterHost.httpAdapter;
   }

   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
         catchError((error) => {
            const response = context.switchToHttp().getResponse();
            const request = context.switchToHttp().getRequest();
            const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
            const message = getMessage(error);
            const additionalInfo = '';
            const endpoint = request.url;
            const timestamp = new Date().toISOString();

            const errorResponse = {
               status,
               message,
               endpoint,
               timestamp,
               additionalInfo,
            };

            this.httpAdapter.reply(response, errorResponse, status);
            return throwError(() => error);
         })
      );
   }
}

export function getMessage(error: any) {
   return error?.response?.message && Array.isArray(error?.response?.message) ? error.response.message.join(', ') : error?.message || 'Internal server error';
}
import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class CustomEventPatternInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const rmqContext = context.switchToRpc().getContext<RmqContext>();
    const channel = rmqContext.getChannelRef();
    const originalMessage = rmqContext.getMessage();

    const { replyTo, correlationId } = originalMessage.properties;

    const sendToQueue = (message: unknown) => {
      channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(message)), {
        correlationId,
      });
    };

    return next.handle().pipe(
      map((result) => {
        sendToQueue(result);
        return result;
      }),
      catchError((error) => {
        sendToQueue(error);
        return throwError(() => error);
      }),
    );
  }
}

import { NestInterceptor, Injectable } from "@nestjs/common";
import { map } from "rxjs";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { instanceToPlain, classToPlain } from "class-transformer";

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe((
            map(data => instanceToPlain(data))
        ))
    }
}
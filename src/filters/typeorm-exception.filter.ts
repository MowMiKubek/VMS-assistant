import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        // console.log(exception.message);
        const message = exception.driverError.message;
        switch (exception.driverError.code) {
            // MYSQL
            case 'ER_NO_REFERENCED_ROW_2': { // 23503
                response.status(422).json({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Foreign key constraint violation.',
                });
                break;
            }
            case 'ER_DUP_ENTRY': {  // 25055
                const fieldRegex = /key '(.+?)'/;
                const fieldMatch = message.match(fieldRegex);
                const field = fieldMatch ? fieldMatch[1] : null;
                response.status(422).json({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Duplicate key constraint violation.',
                    field,
                });
                break;
            }
            // POSTGRES
            case '23503': { // foreign key constraint violation
                response.status(422).json({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Foreign key constraint violation.',
                });
                break;
            }
            case '23505': { // unique constraint violation
                const fieldRegex = /"([^"]+)"/;
                const fieldMatch = message.match(fieldRegex);
                const field = fieldMatch ? fieldMatch[1] : null;
                response.status(422).json({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Duplicate key constraint violation.',
                    field,
                });
                break;
            }
            default: {
                response.status(500).json({
                    statusCode: 500,
                    message: 'Unknown database error',
                });
            }
        }
    }
}

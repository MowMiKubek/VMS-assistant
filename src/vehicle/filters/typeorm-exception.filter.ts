import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        switch (exception.driverError.code) {
            case 'ER_NO_REFERENCED_ROW_2': {
                response.status(422).json({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Foreign key constraint violation.',
                });
            }
            case 'ER_DUP_ENTRY': {
              console.log(exception.message);
              response.status(422).json({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                message: 'Duplicate key constraint violation.',
            });
            }
            default: {
                console.log(exception.driverError.code)
                response.status(500).json({
                    statusCode: 500,
                    message: 'Unknown database error',
                });
            }
        }
    }
}

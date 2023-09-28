import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiHeader,
    ApiHeaders,
    ApiOkResponse,
    ApiOperation,
    ApiProperty,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { Role } from './role/role.enum';
import { Roles } from './role/role.decorator';
import { RolesGuard } from './guards/role.guard';

class LoginResponse {
    @ApiProperty({
        default:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJsb2dpbiI6Imp0a2FjenlrIiwiaWF0IjoxNjkyODg5MDIzLCJleHAiOjE2OTI4OTI2MjN9.UK-bEMxt7TIrOd9ZwnkG2VVqbk1fizbCTsWOE89XYa',
    })
    access_token: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login user' })
    @ApiOkResponse({
        description: 'User successfully logged in, jwt token in response',
        type: LoginResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'User credentials incorrect',
    })
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        console.log(loginDto);
        return this.authService.singIn(loginDto);
    }


    @ApiOperation({ summary: 'Register user' })
    @ApiCreatedResponse({
        description: 'User was created, user object as response',
        type: User,
    })
    @ApiBadRequestResponse({
        description:
            'Incorrect fields in request body, error object (fields: message, error, statusCode) as response',
    })
    @ApiUnprocessableEntityResponse({
        description:
            'Integrity error from database, violation of eighter duplicate or foreign key constraint, error object as response',
    })
    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.singUp(createUserDto);
    }


    @ApiOperation({ summary: 'Refresh access token' })
    @ApiHeader({
        name: 'Authorization',
        description: 'JWT access token',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
        description:
            'User greeting message as response, if provided token is valid',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid access_token',
    })
    @UseGuards(RolesGuard)
    @Get('profile')
    profile(@Request() req) {
        return `Witaj ${req.user.login}, id: ${req.user.id}`;
    }

    @ApiOperation({ summary: 'Refresh access token' })
    @ApiHeader({
        name: 'authorization',
        description: 'JWT access token',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
        description:
            'User greeting message as response, if provided token is valid',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid access_token',
    })
    @ApiForbiddenResponse({
        description: 'User does not have sufficient role',
    })
    @Get('test/admin')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    testAdmin() {
        return 'Admin route';
    }
    

    @ApiOperation({ summary: 'Refresh access token' })
    @ApiHeader({
        name: 'authorization',
        description: 'JWT access token',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
        description:
            'User greeting message as response, if provided token is valid',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid access_token',
    })
    @ApiForbiddenResponse({
        description: 'User does not have sufficient role',
    })
    @Get('test/manager')
    @UseGuards(RolesGuard)
    @Roles(Role.Manager)
    testManager() {
        return 'Manager route';
    }
}

import {
    Body,
    Controller,
    Get,
    Delete,
    NotFoundException,
    Post,
    Patch,
    Request,
    UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UpdateUserRegularDto } from '../user/dto/update-user-regular.dto';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiProperty,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from './role/role.enum';
import { Roles } from './role/role.decorator';
import { RolesGuard } from './guards/role.guard';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { CreatePermissionDto } from '../user/dto/create-permission.dto';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';

class LoginResponse {
    @ApiProperty({
        default:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJsb2dpbiI6Imp0a2FjenlrIiwiaWF0IjoxNjkyODg5MDIzLCJleHAiOjE2OTI4OTI2MjN9.UK-bEMxt7TIrOd9ZwnkG2VVqbk1fizbCTsWOE89XYa',
    })
    access_token: string;
}

@ApiTags('auth')
@ApiHeader({ name: 'Authorization', description: 'JWT access token' })
@Controller('auth')    
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
        ) {}

    @ApiOperation({ summary: 'Login user' })
    @ApiOkResponse({ description: 'User successfully logged in, jwt token in response', type: LoginResponse })
    @ApiUnauthorizedResponse({ description: 'User credentials incorrect'})
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.singIn(loginDto);
    }

    @ApiOperation({ summary: 'Current user data' })
    @ApiOkResponse({ description: 'User greeting message as response, if provided token is valid' })
    @ApiUnauthorizedResponse({description: 'Invalid access_token'})
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Get('profile')
    async profile(@Request() req) {
        return this.userService.findOne(req.user.id);
    }

    @ApiOperation({ summary: 'Update current user data' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Patch('profile')
    async profileUpdate(@Request() req, @Body() updateUserDto: UpdateUserRegularDto) {
        console.log(updateUserDto);
        return this.userService.update(req.user.id, updateUserDto);
    }

    @ApiOperation({ summary: 'Update current user password' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Patch('profile/password')
    async passwordUpdate(@Request() req, @Body() updateUserDto: UpdatePasswordDto) {
        console.log(updateUserDto);
        return this.userService.updatePassword(req.user.id, updateUserDto);
    }


    @ApiOperation({ summary: 'Current user vehicles' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Get('vehicles')
    async vehicles(@Request() req): Promise<Vehicle[]> {
        return this.userService.getVehicles(req.user.id);
    }

    @ApiOperation({ summary: 'Current user costs' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Get('costs')
    async costs(@Request() req) {
        return this.userService.getCosts(req.user.id);
    }

    @ApiOperation({ summary: 'Grant driving permission to user' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Post('permissions')
    addPermission(@Request() req, @Body() permission: CreatePermissionDto) {
        return this.userService.addPermission(req.user.id, permission);
    }

    @ApiOperation({ summary: 'Revoke driving permission from user' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Delete('permissions')
    deletePermission(@Request() req, @Body() permission: CreatePermissionDto) {
        return this.userService.deletePermission(req.user.id, permission);
    }

    @ApiOperation({ summary: 'Test admin route' })
    @ApiOkResponse({ description: 'Admin greeting message as response, if provided token is valid' })
    @ApiUnauthorizedResponse({ description: 'Invalid access_token' })
    @ApiForbiddenResponse({ description: 'User does not have sufficient role' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get('test/admin')
    testAdmin() {
        return 'Admin route';
    }
    
    @ApiOperation({ summary: 'Test manager route' })
    @ApiOkResponse({ description:'Manager greeting message as response, if provided token is valid' })
    @ApiUnauthorizedResponse({ description: 'Invalid access_token'  })
    @ApiForbiddenResponse({description: 'User does not have sufficient role' })
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.Manager)
    @Get('test/manager')
    testManager() {
        return 'Manager route';
    }
}

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        console.log(loginDto)
        return this.authService.singIn(loginDto);
    }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.singUp(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Request() req) {
        return `Witaj ${req.user.login}, id: ${req.user.id}`;
    }
}

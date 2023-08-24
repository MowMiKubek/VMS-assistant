import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async singIn(loginDto: LoginDto) {
        const { login, password } = loginDto;
        const queryResult = await this.userService.find({ 
            where: { login },
            take: 1
        })
        if(queryResult.length === 0) {
            throw new UnauthorizedException('Invalid login data');
        }
        const currentUser = queryResult[0];

        const verifyPassword = await bcrypt.compare(password, currentUser.haslo) 
        if(!verifyPassword) {
            throw new UnauthorizedException('Invalid login data');
        }

        // After user is verified, sign jwt token
        const payload = { id_user: currentUser.id_user, login: currentUser.login };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async singUp(createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    async profile(user_id: number) {
        return this.userService.findOne(user_id);
    }
}

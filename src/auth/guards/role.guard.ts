import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ROLES_KEY } from "../role/role.decorator";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Role } from "../role/role.enum";

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
}

const ROLES_VALUES: EnumDictionary<Role, number> = {
    [Role.Admin]: 3,
    [Role.Manager]: 2,
    [Role.User]: 1,
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService
        ) {}

    async canActivate(context: ExecutionContext) {
        // check for user jwt token
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('token not provided');
        }
        // verify jwt token
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.getOrThrow<string>('JWT_SECRET'),
                }
            )
            request['user'] = payload; // id, login, and role
        } catch {
            throw new UnauthorizedException('invalid token');
        }

        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some(role => ROLES_VALUES[role] <= ROLES_VALUES[user.role]);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
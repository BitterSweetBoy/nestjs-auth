import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

export const IS_PUBLIC_KEY = 'isPublicKey';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService, private reflector:Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic){
            return true
        }

        const request = context.switchToHttp().getRequest();
        const token = this.getToken(request);
        console.log(token);
        if(!token){
            throw new UnauthorizedException('No autenticado')
        }
        try{
            const payload = await this.jwtService.verifyAsync(token, {secret : process.env.SECRET});
            request['user'] = payload;
        } catch(e){
            throw new UnauthorizedException('No autenticado')
        }
        return true;
    }

    private getToken(request: Request): string | undefined{
        const [type, token] = request.headers.authorization?.split('') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
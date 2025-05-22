import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

interface UserDTO {
    name: string;
    email: string;
    password: string;
}

//@Public() decorador para permitri que todo el controller sea public
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    logIn(@Body() user: UserDTO){
        return this.authService.logIn(user.email, user.password);
    }

    //@UseGuards(AuthGuard) guard personalizado
    @Get('users')
    getUsers(){
        return this.authService.getUsers();
    }

    @Post('signup')
    signUp(@Body() user: UserDTO){
        return this.authService.signUp(user.name, user.email, user.password);
    }
}

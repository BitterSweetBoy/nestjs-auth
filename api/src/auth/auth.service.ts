import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { compare, encrypt } from 'src/libs/bcript';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService
    ) {}

    async getUsers() {
        return await this.prismaService.user.findMany();
    }

    async signUp(name: string, email: string, password: string) {
        try{
            const userFound = await this.prismaService.user.findUnique({
                where: {
                    email,
                },
            });

            if (userFound) throw new BadRequestException('El usuario ya existe');
            
            const hashedPassword = await encrypt(password);

            const user = await this.prismaService.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            const {password: _, ...userWithoutPassword} = user;

            const payload = {
                ...userWithoutPassword
            }

            const access_token = await this.jwtService.signAsync(payload);
            return {access_token};
        } catch (error){
            if(error instanceof BadRequestException){
                throw error;
            }
            throw new Error('Error al crear el usuario');
        }
    }

    async logIn(email: string, passowrd:string){
        try{
            const user = await this.prismaService.user.findUnique({
                where: {
                    email,
                },
            });
            if(!user){
                throw new BadRequestException('Email o contraseña invalidos')
            }
            const isPasswordMatch = await compare(passowrd, user.password!);
            if(!isPasswordMatch){
                throw new BadRequestException('Email o contraseña invalidos')
            }

            const {password: _, ...userWithoutPassword} = user;

            const payload = {
                ...userWithoutPassword,
            }

            const access_token = await this.jwtService.signAsync(payload);

            return {access_token};

        } catch (e){
            if(e instanceof BadRequestException){
                throw e;
            }

            throw new InternalServerErrorException('Error al iniciar sesión');
        }
    }
}

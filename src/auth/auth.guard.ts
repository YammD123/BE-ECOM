import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Observable } from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private prisma: PrismaService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        try {
            //masukan token ke headers
            const request = context.switchToHttp().getRequest();
            const authHeader = request.headers['authorization'];

            if(!authHeader){
                throw new HttpException('Unauthorized headers not found', HttpStatus.UNAUTHORIZED);
            }
            const token = authHeader.replace('Bearer ','');

            //check token yang dimasukan
            const user = await this.prisma.user.findUnique({
                where: {
                    token: token
                }
            })

            if(!user){
                throw new HttpException('Unauthorization user not found', HttpStatus.UNAUTHORIZED);
            }

            request.user = user
            return true
        } catch (error) {
            throw error
        }
    }
}
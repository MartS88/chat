import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersService} from '../users/users.service';
import {User} from '../users/user-model';
import {RefreshToken} from './refresh-token-model';
import {JwtModule} from '@nestjs/jwt';
import {ActivationLink} from "../users/activation-link-model";


@Module({
    imports: [
        SequelizeModule.forFeature([User, RefreshToken,ActivationLink]),
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN},
        }),
    ],
    providers: [AuthService, UsersService],
    controllers: [AuthController],
})
export class AuthModule {
}

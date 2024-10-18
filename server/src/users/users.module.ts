import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {User} from './user-model';
import {AuthModule} from '../auth/auth.module';
import {JwtModule} from '@nestjs/jwt';


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN},
        }),
        SequelizeModule.forFeature([User]),
        forwardRef(() => AuthModule),
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {
}

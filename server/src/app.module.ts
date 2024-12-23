import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import * as process from 'process';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from "./users/user-model";
import {UsersModule} from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import {RefreshToken} from "./auth/refresh-token-model";
import {ActivationLink} from "./users/activation-link-model";



@Module({

    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_NAME,
            models: [User,RefreshToken,ActivationLink],
            autoLoadModels: true,
        }),
        UsersModule,
        AuthModule,
    ],


})
export class AppModule {
}

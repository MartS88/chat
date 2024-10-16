import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user-model';
import {InjectModel} from '@nestjs/sequelize';
import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common'
import {UpdatePasswordDto} from './dto/update-password.dto';
import {UpdateEmailDto} from './dto/update-email.dto';
import * as bcrypt from 'bcryptjs';
import {UpdateUsernameDto} from './dto/update-username.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
    ) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user

    }

    async updateUsername(dto: UpdateUsernameDto) {
            const user = await this.getUserByEmail(dto.email)
            if (!user) {
                throw new Error('User with this email does not exist');
            }
            user.username = dto.newUsername
            await user.save()
            return 'Username updated'
    }


    async updatePassword(dto: UpdatePasswordDto): Promise<void> {
        try {
            const {email, newPassword} = dto;

            const user = await this.userRepository.findOne({
                where: {email: email.toLowerCase()},
                include: {all: true},
            });
            const hashPassword = await bcrypt.hash(newPassword, 5);
            user.password = hashPassword;
            await user.save();
        } catch (error) {
            console.error('Error updating password:', error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating password');
        }
    }



    async updateEmail(dto: UpdateEmailDto) {
        try {
            const {email, newEmail} = dto;
            const user = await this.userRepository.findOne({where: {email: email.toLowerCase()}, include: {all: true}});
            user.email = newEmail;
            await user.save();
            return {email: user.email}
        } catch (error) {
            console.error('Error updating email:', error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating email');
        }
    }


}

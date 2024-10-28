import * as bcrypt from 'bcryptjs';
import {InjectModel} from '@nestjs/sequelize';
import {Sequelize} from 'sequelize-typescript';
import {ConflictException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {User} from './user-model';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUsernameDto} from './dto/update-username.dto';
import {UpdatePasswordDto} from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private sequelize: Sequelize
  ) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
    return user;
  }

  async getUserByUsername(username: string) {
    const findUsername = await this.userRepository.findOne({where: {username}, include: {all: true}});
    return findUsername;
  }

  async updateUsername(dto: UpdateUsernameDto) {
    const user = await this.getUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    const existingUser = await this.getUserByUsername(dto.newUsername);
    if (existingUser?.id === user?.id) {
      throw new ConflictException({
        success: false,
        message: 'You already have this username'
      });
    } else if (existingUser) {
      throw new ConflictException({
        success: false,
        message: 'Username is already taken.'
      });
    } else {
      user.username = dto.newUsername;
      await user.save();
      return {
        success: true,
        message: 'Username updated successfully'
      };

    }

  }

  async updatePassword(dto: UpdatePasswordDto): Promise<any> {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userRepository.findOne({where: {email: dto.email}, transaction});
      if (!user || user.password === null) {
        throw new NotFoundException('User with this email does not exist.');
      }
      const passwordEquals = await bcrypt.compare(dto.password, user.password);
      if (!passwordEquals) {
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
      }
      const newHashPassword = await bcrypt.hash(dto.newPassword, 5);
      user.password = newHashPassword;
      await user.save({transaction});
      await transaction.commit();
      return 'Password updated';
    } catch (error) {

      await transaction.rollback();
      throw error;
    }
  }
}

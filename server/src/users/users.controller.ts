import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Param,
  BadRequestException, Patch, Req, Get, Res, HttpStatus,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UpdatePasswordDto} from './dto/update-password.dto';
import {UpdateEmailDto} from './dto/update-email.dto';
import {Response} from "express";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, description: 'User gets successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('/:email')
  async fetchUser(@Param('email') email: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      return {success: true,isActivated:user.isActivated,statusCode: 200};

    } catch (error) {
      console.error('Error activating account:', error);
      return {success: false, message: error.message, statusCode: 400};
    }
  }

  @ApiOperation({ summary: 'Password update' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UsePipes(ValidationPipe)
  @Patch(':email/update-password')
  async updatePassword(@Param('email') email: string, @Body() updatePasswordDto: UpdatePasswordDto): Promise<any> {
    try {
      if (!email || !updatePasswordDto || !updatePasswordDto.newPassword) {
        throw new BadRequestException('Invalid input. Email and newPassword are required.');
      }
      await this.usersService.updatePassword(updatePasswordDto);
      return {success: true, message: 'Password was changed', statusCode: 200};
    } catch (error) {
      return {success: false, message: error.message, statusCode: 400};
    }
  }

  @ApiOperation({ summary: 'Email update' })
  @ApiResponse({ status: 200, description: 'Email updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UsePipes(ValidationPipe)
  @Patch(':email/update-email')
  async updateEmail(@Param('email') email: string, @Body() updateEmailDto: UpdateEmailDto): Promise<any> {
    try {
      const {email, newEmail} = updateEmailDto;
      if (!email || !updateEmailDto || !updateEmailDto.email) {
        throw new BadRequestException('Invalid input. Email are required.');
      }
      if (email.toLowerCase() === newEmail.toLowerCase()) {
        throw new BadRequestException('You already have this email');
      }
      await this.usersService.updateEmail(updateEmailDto);
      return {success: true,  message: 'Email was changed', statusCode: 200};
    } catch (error) {
      return {success: false, message: error.message, statusCode: 400};
    }
  }

}
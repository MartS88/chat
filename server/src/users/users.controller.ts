import {
  Controller,
  Body,
  ValidationPipe,
  UsePipes,
  Param,
  Patch, Get, Req, UseGuards, BadRequestException
} from '@nestjs/common';

import {UsersService} from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UpdateUsernameDto} from './dto/update-username.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {UpdatePasswordDto} from './dto/update-password.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({summary: 'Get user'})
  @ApiResponse({status: 200, description: 'User gets successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('/:email')
  async fetchUser(@Param('email') email: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      if (!user) {
        return {message: 'User with this email does not exist'}
      }
      return {success: true, message: user, statusCode: 200};

    } catch (error) {
      console.error('Error activating account:', error);
      return {success: false, message: error.message, statusCode: 400};
    }
  }


  @ApiOperation({summary: 'Username update'})
  @ApiResponse({status: 200, description: 'Username updated successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Patch('/update-username')
  async updateEmail( @Body() dto: UpdateUsernameDto): Promise<any> {
    return  this.usersService.updateUsername(dto);
    // try {
    //   console.log('req', req);
    //   console.log('dto', dto);
    //   const username = await this.usersService.updateUsername(dto);
    //   return {success: true, message: username, statusCode: 200};
    // } catch (error) {
    //   console.log('error', error);
    //   return {success: false, message: error.message, statusCode: 400};
    // }
  }


  @ApiOperation({summary: 'Password update'})
  @ApiResponse({status: 200, description: 'Password updated successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Patch('/update-password')
  async updatePassword(@Body() dto: UpdatePasswordDto): Promise<any> {
    try {
      const password = await this.usersService.updatePassword(dto);
      return {success: true, message: password, statusCode: 200};
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}


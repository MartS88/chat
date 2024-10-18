import {
  Controller,
  Body,
  ValidationPipe,
  UsePipes,
  Param,
  Patch, Get, Req, UseGuards
} from '@nestjs/common';

import {UsersService} from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UpdateUsernameDto} from './dto/update-username.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';


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
        return  {message:'User with this email does not exist'}
      }
      return {success: true, message:user, statusCode: 200};

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
  async updateEmail(@Req() req: Request, @Body() dto: UpdateUsernameDto): Promise<any> {
    try {
      console.log('req', req);
      console.log('dto',dto);
      const username = await this.usersService.updateUsername(dto);
      return {success: true, message: username, statusCode: 200};
    } catch (error) {
      console.log('error', error);
      return {success: false, message: error.message, statusCode: 400};
    }
  }
}

//   @ApiOperation({summary: 'Password update'})
//   @ApiResponse({status: 200, description: 'Password updated successfully'})
//   @ApiResponse({status: 400, description: 'Bad Request'})
//   @ApiResponse({status: 500, description: 'Internal Server Error'})
//   @UsePipes(ValidationPipe)
//   @Patch(':email/update-password')
//   async updatePassword(@Param('email') email: string, @Body() updatePasswordDto: UpdatePasswordDto): Promise<any> {
//     try {
//       if (!email || !updatePasswordDto || !updatePasswordDto.newPassword) {
//         throw new BadRequestException('Invalid input. Email and newPassword are required.');
//       }
//       await this.usersService.updatePassword(updatePasswordDto);
//       return {success: true, message: 'Password was changed', statusCode: 200};
//     } catch (error) {
//       return {success: false, message: error.message, statusCode: 400};
//     }
//   }
//
//
//   @ApiOperation({summary: 'Email update'})
//   @ApiResponse({status: 200, description: 'Email updated successfully'})
//   @ApiResponse({status: 400, description: 'Bad Request'})
//   @ApiResponse({status: 500, description: 'Internal Server Error'})
//   @UsePipes(ValidationPipe)
//   @Patch(':email/update-email')
//   async updateEmail(@Param('email') email: string, @Body() updateEmailDto: UpdateEmailDto): Promise<any> {
//     try {
//       const {email, newEmail} = updateEmailDto;
//       if (!email || !updateEmailDto || !updateEmailDto.email) {
//         throw new BadRequestException('Invalid input. Email are required.');
//       }
//       if (email.toLowerCase() === newEmail.toLowerCase()) {
//         throw new BadRequestException('You already have this email');
//       }
//       await this.usersService.updateEmail(updateEmailDto);
//       return {success: true, message: 'Email was changed', statusCode: 200};
//     } catch (error) {
//       return {success: false, message: error.message, statusCode: 400};
//     }
//   }
// }
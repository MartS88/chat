import {
  Body,
  Controller, Get, HttpException,
  HttpStatus, Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {AuthService} from './auth.service';
import {Response} from 'express';

interface RequestWithCookies extends Request {
  cookies: {
    refreshToken: string;
  };
}

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() userDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    const userData = await this.authService.login(userDto);
    res.cookie('refreshToken', userData.tokens.refreshToken, {httpOnly: true, secure: true});
    return {accessToken: userData.tokens.accessToken, email: userData.email, isActivated: userData.isActivated};
  }

  @ApiOperation({ summary: 'Registration' })
  @Post('/registration')
  @UsePipes(ValidationPipe)
  async registration(@Body() userDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    const userData = await this.authService.registration(userDto);
    res.cookie('refreshToken', userData.tokens.refreshToken, {httpOnly: true, secure: true});
    return {accessToken: userData.tokens.accessToken, email: userData.email};
  }

  @ApiOperation({ summary: 'Refresh token' })
  @Post('/refresh')
  @UsePipes(ValidationPipe)
  async refresh(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    const tokens = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true});
    return res.json({accessToken: tokens.accessToken});
  }

  @ApiOperation({ summary: 'Logout' })
  @Post('/logout')
  @UsePipes(ValidationPipe)
  async logout(@Req() req: RequestWithCookies, @Res() res: Response): Promise<Response> {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        console.log('!refreshToken');
        throw new UnauthorizedException('Refresh token is missing');
      }
      await this.authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({message: 'Logout successful'});
    } catch (error) {
      console.log('error', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Logout failed'});
    }
  }

  @ApiOperation({ summary: 'Token activation' })
  @Get('/activation/:token')
  async activation(@Param('token') token: string, @Res() res: Response) {
    try {
      await this.authService.activate(token);
      return res.redirect('http://localhost:3000/user-area');
    } catch (error) {
      console.error('Error activating account:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, error: error.message});
    }
  }
  @ApiOperation({ summary: 'Password recovery' })
  @Post('/password-recovery')
  @UsePipes(ValidationPipe)
  async sendPasswordRecoveryCode(@Body('email') email: string) {
    try {
      console.log('Received email:', email);
      await this.authService.passwordRecovery(email);
      return { success: true, message: 'Recovery code was sent to your email', statusCode: 200 };
    } catch (error) {
      console.error('Error sending password recovery code:', error);
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


}
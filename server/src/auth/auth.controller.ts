import {
  Body,
  Controller, Get, HttpException,
  HttpStatus, Param, Patch,
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
import {PasswordRecoveryDto} from './dto/password-recovery.dto';


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

  @ApiOperation({summary: 'Login'})
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() userDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    const userData = await this.authService.login(userDto);
    res.cookie('refreshToken', userData.tokens.refreshToken, {httpOnly: true, secure: true});
    return {accessToken: userData.tokens.accessToken, username:userData.username, email: userData.email, isActivated: userData.isActivated};
  }

  @ApiOperation({summary: 'Registration'})
  @Post('/registration')
  @UsePipes(ValidationPipe)
  async registration(@Body() userDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    const userData = await this.authService.registration(userDto);
    res.cookie('refreshToken', userData.tokens.refreshToken, {httpOnly: true, secure: true});
    return {accessToken: userData.tokens.accessToken, username:userData.username, email: userData.email, isActivated:userData.isActivated};
  }

  @ApiOperation({summary: 'Refresh token'})
  @Post('/refresh')
  @UsePipes(ValidationPipe)
  async refresh(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    const tokens = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true});
    return res.json({accessToken: tokens.accessToken});
  }

  @ApiOperation({summary: 'Logout'})
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

  @ApiOperation({summary: 'Token activation'})
  @Get('/activation/:token')
  async activation(@Param('token') token: string, @Res() res: Response) {
    try {
      await this.authService.activate(token);
      res.send(`
      <html>
        <head>
          <title>Activation</title>
        </head>
        <body>
          <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
            <img src='https://myecomz.com/en/img/emails/51-merchant-6-registration.png' alt="Activation Successful" />
            <h2>Activation Successful!</h2>
            <p>You will be redirected shortly...</p>
          </div>
          <script>
            setTimeout(function() {
              window.location.href = 'http://localhost:3000/home';
            }, 3000);
          </script>
        </body>
      </html>
    `);

    } catch (error) {
      console.error('Error activating account:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, error: error.message});
    }
  }

  @ApiOperation({summary: 'Send code for password recovery'})
  @Post('/get-code')
  @UsePipes(ValidationPipe)
  async sendPasswordRecoveryCode(@Body('email') email: string) {
    try {
      await this.authService.getPasswordRecoveryCode(email);
      return {success: true, message: 'Recovery code was sent to your email', statusCode: 200};
    } catch (error) {
      console.error('Error sending password recovery code:', error);
      throw new HttpException(
        {success: false, message: error.message},
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @ApiOperation({summary: 'Password recovery'})
  @Patch('/password-recovery')
  @UsePipes(ValidationPipe)
  async passwordRecovery(@Body() recoveryDto: PasswordRecoveryDto) {
    try {
      const userData = await this.authService.passwordRecovery(recoveryDto);
      return {success: true, message: userData, statusCode: 200};
    } catch (error) {
      console.error('Error password recovery:', error);
      throw new HttpException(
        {success: false, message: error.message},
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  //
  // @Get('/me')
  // async getProfile(@Req() req: Request, @Res() res: Response) {
  //   // Получаем refreshToken из cookies
  //   const refreshToken = req.cookies['refreshToken'];
  //   if (!refreshToken) {
  //     throw new UnauthorizedException('Refresh token not found');
  //   }
  //
  //   try {
  //     // Проверяем, существует ли токен в базе данных и является ли он валидным
  //     const user = await this.authService.verifyRefreshToken(refreshToken);
  //     if (!user) {
  //       throw new UnauthorizedException('Invalid token');
  //     }
  //
  //     // Возвращаем данные пользователя, если токен валиден
  //     return res.json({ user });
  //   } catch (error) {
  //     throw new UnauthorizedException('Unauthorized');
  //   }
  // }

}
import {HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {User} from '../users/user-model';
import {InjectModel} from '@nestjs/sequelize';
import {RefreshToken} from './refresh-token-model';
import {v4 as uuidv4} from 'uuid';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import {ActivationLink} from '../users/activation-link-model';
import {MailtrapClient, MailtrapTransport} from 'mailtrap';
import * as process from 'node:process';
import {PasswordRecoveryDto} from './dto/password-recovery.dto';


dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(RefreshToken) private refreshTokenRepository: typeof RefreshToken,
    @InjectModel(ActivationLink) private activationLinkRepository: typeof ActivationLink
  ) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateTokens(user);
    return {tokens, username: user.username, email: user.email, isActivated: user.isActivated};
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    const candidateUsername = await this.userService.getUserByUsername(userDto.email)
    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hashPassword});
    const activationLink = uuidv4();

    await this.activationLinkRepository.create({
      userId: user.id,
      activationLink: activationLink
    });
    await this.sendActivationLink(user, activationLink);
    const tokens = await this.generateTokens(user);
    return {tokens, username: user.username, email: user.email, isActivated: user.isActivated};
  }


  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    const token = await this.refreshTokenRepository.destroy({where: {token: refreshToken}});
    return {message: 'Logout successful', token};
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    try {
      const payload = this.jwtService.verify(refreshToken, {secret: process.env.JWT_REFRESH_SECRET});
      const user = await this.userService.getUserByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return this.generateTokens(user);
    } catch (error) {
      console.log('refresh token error',error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: User) {
    console.log('  expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,',  process.env.ACCESS_TOKEN_EXPIRES_IN,);
    const payload = {id: user.id, email: user.email};
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      secret: process.env.JWT_ACCESS_SECRET
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      secret: process.env.JWT_REFRESH_SECRET
    });

    await this.refreshTokenRepository.upsert({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    return {accessToken, refreshToken};
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user || user.password === null) {
      throw new NotFoundException('User with this email does not exist.');
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (passwordEquals) {
      return user;
    }
    throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
  }

  async sendActivationLink(user: User, activationLink: string) {
    const TOKEN = process.env.NODEMAILER_TOKEN;

    const client = new MailtrapClient({
      token: TOKEN
    });

    const sender = {
      email: 'hello@demomailtrap.com',
      name: 'BlockVision'
    };

    const recipients = [
      {
        email: user.email
      }
    ];

    try {

      await client.send({
        from: sender,
        to: recipients,
        subject: 'BlockVision user account activation link',
        html: `
        <!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          </head>
          <body style="font-family: sans-serif;">
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Account Activation</h2>
              <p>Hello ${user.username},</p>
              <p>Thank you for registering. Please click the link below to activate your account:</p>
              <p><a href="http://localhost:5000/auth/activation/${activationLink}" style="color: #3498db; text-decoration: none;">Activate Account</a></p>
              <p>If you did not request this email, please ignore it.</p>
              <br>
              <p>Best regards,</p>
              <p>Your Block Vision Team</p>
            </div>
          </body>
        </html>
      `,
        category: 'Integration Test'
      });

      console.log('Activation link sent successfully');
    } catch (error) {

      console.error('Failed to send activation link:', error);
      await this.userRepository.destroy({where: {email: user.email}});
      throw new HttpException('Failed to send activation link', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async activate(link: string) {
    const activation = await this.activationLinkRepository.findOne({
      where: {activationLink: link},
      include: {all: true}
    });

    if (!activation) {
      throw new UnauthorizedException('Not correct activation link');
    }
    activation.activationLink = link;
    await activation.save();
    const user = await this.userRepository.findOne({where: {id: activation.userId}});
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
     user.isActivated = true;
      await user.save();
     // await activation.destroy();
    return 'Activation successful';
  }


  async getPasswordRecoveryCode(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }
    const passwordCode = new Date(user.resetPasswordExpires)
    const now = new Date();

    if (passwordCode && now < passwordCode) {
      throw new NotFoundException('You already have not expired code in your email');
    }
    const recoveryCode = uuidv4().replace(/\D/g, '').substring(0, 6);
    user.resetPasswordCode = recoveryCode;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    const username = user.username;
    await user.save();
    await this.sendPasswordRecoveryCode(email, recoveryCode, username);
  }

  async sendPasswordRecoveryCode(email: string, code: string, username: string) {
    const TOKEN = process.env.NODEMAILER_TOKEN;

    const client = new MailtrapClient({
      token: TOKEN
    });

    const sender = {
      email: 'hello@demomailtrap.com',
      name: 'BlockVision'
    };

    const recipients = [
      {
        email: email
      }
    ];

    try {
      await client.send({
        from: sender,
        to: recipients,
        subject: 'BlockVision user password recovery code',
        html: `
        <!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          </head>
          <body style="font-family: sans-serif;">
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Password Recovery</h2>
              <p>Hello ${username},</p>
              <p>We received a request to reset your password. Please use this code to set a new password:</p>
              <p style="color: #3498db; text-decoration: none;">${code}</p>
               <p>This code is valid for the next 15 minutes.</p>
              <p>If you did not request a password reset, please ignore this email.</p>
              <br>
              <p>Best regards,</p>
              <p>Your Block Vision Team</p>
            </div>
          </body>
        </html>
      `,
        category: 'Integration Test'
      });

      console.log('Password recovery code sent successfully');
    } catch (error) {
      throw new HttpException('Failed to send password recovery code', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async passwordRecovery(recoveryDto: PasswordRecoveryDto) {
    const user = await this.userService.getUserByEmail(recoveryDto.email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    const recoveryCode = await this.userRepository.findOne({
      where: {
        email: recoveryDto.email,
        resetPasswordCode: recoveryDto.resetPasswordCode
      },
      include: {all: true}
    });
    if (!recoveryCode) {
      throw new Error('Verification code is not correct');
    }

    const now = new Date();
    const expirationTime = new Date(recoveryCode.resetPasswordExpires);

    if (now > expirationTime) {
      throw new Error('Verification code has expired');
    }
    const hashPassword = await bcrypt.hash(recoveryDto.newPassword, 5);
    user.password = hashPassword;
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();
    return user;
  }

  // async emailVerification(userId: number, code: string) {
  //     const id = userId
  //     const verification = await this.emailConfirmationRepository.findOne({
  //         where: {userId, code},
  //         include: {all: true}
  //     });
  //     if (!verification) {
  //         console.log('emailVerification-SERVER');
  //         throw new Error('Verification code is not correct');
  //     }
  //
  //     if (verification) {
  //         const now = new Date();
  //         const expirationTime = new Date(verification.createdAt);
  //         const threeMinutesInMs = 3 * 60 * 1000;
  //         const expirationTimePlus3Minutes = new Date(expirationTime.getTime() + threeMinutesInMs);
  //         console.log('verification.createdAt', verification.createdAt);
  //         console.log('expirationTime', expirationTime);
  //
  //         if (now > expirationTimePlus3Minutes) {
  //             await verification.destroy()
  //             const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
  //             await user.destroy()
  //             throw new Error('Verification code has expired.');
  //         } else {
  //             const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
  //             user.isEmailConfirmed = true
  //             await user.save()
  //             await verification.destroy()
  //             return 'Registration completed'
  //         }
  //     }
  //     return verification;
  //
  // }

}

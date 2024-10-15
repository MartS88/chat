import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class PasswordRecoveryDto {

  @ApiProperty({example: 'user@gmail.com', description: 'Email'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @IsEmail({}, {message: 'Not correct email'})
  readonly email: string;

  @ApiProperty({ example: '874751', description: 'Code for password recovery' })
  @IsString({ message: 'Value must be string' })
  @Length(6, 6, { message: 'Length must be exactly 6 characters' })
  @IsNotEmpty()
  readonly resetPasswordCode: string;


  @ApiProperty({example: '12345', description: 'Password'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @Length(5, 16, {message: 'Password must contain from 5 to 16 characters'})
  readonly newPassword: string;

}

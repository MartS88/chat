import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class CreateUserDto {

  // @ApiProperty({example: 'dexter', description: 'Username'})
  // @IsString({message: 'Value must be string'})
  // @IsNotEmpty()
  // @Length(3, 16, {message: 'Username must contain from 3 to 16 characters'})
  // readonly username: string;

  @ApiProperty({example: 'user@gmail.com', description: 'Email'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @IsEmail({}, {message: 'Not correct email'})
  readonly email: string;

  @ApiProperty({example: '12345', description: 'Password'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @Length(5, 16, {message: 'Password must contain from 5 to 16 characters'})
  readonly password: string;

}

import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class UpdateUsernameDto {
  @ApiProperty({example: 'user@gmail.com', description: 'Email'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @IsEmail({}, {message: 'Not correct email'})
  readonly email: string;

  @ApiProperty({example: 'dexter', description: 'Username'})
  @IsString({message: 'Value must be string'})
  @IsNotEmpty()
  @Length(3, 16, {message: 'Username must contain from 3 to 16 characters'})
  readonly newUsername: string;


}

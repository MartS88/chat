import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordRecoveryCodeDto {
  @ApiProperty({ example: 'resetToken123', description: 'Password reset code' })
  @IsString({ message: 'Value must be a string' })
  @IsNotEmpty({ message: 'Password reset code cannot be empty' })
  readonly resetPasswordCode: string;

  @ApiProperty({ example: '2024-10-14T12:00:00Z', description: 'Password reset expiration date' })
  @IsNotEmpty({ message: 'Expiration date cannot be empty' })
  readonly resetPasswordExpires: Date;
}
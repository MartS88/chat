import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RefreshToken } from '../auth/refresh-token-model';
import { ActivationLink } from './activation-link-model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'dexter', description: 'Username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false, defaultValue: '' })
  username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'user12345', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'false', description: 'Activation status' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isActivated: boolean;

  @HasMany(() => ActivationLink, { onDelete: 'CASCADE', hooks: true })
  emailConfirmed: ActivationLink[];

  @HasMany(() => RefreshToken, { onDelete: 'CASCADE', hooks: true })
  refreshToken: RefreshToken[];
}

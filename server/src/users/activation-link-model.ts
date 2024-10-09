import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user-model';

interface ActivationLinkCreationAttrs {
    userId: number;
    activationLink: string;
}

@Table({ tableName: 'activation_links' })
export class ActivationLink extends Model<ActivationLink, ActivationLinkCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique identifier' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '421265', description: 'Activation link' })
    @Column({ type: DataType.STRING, allowNull: false })
    activationLink: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}

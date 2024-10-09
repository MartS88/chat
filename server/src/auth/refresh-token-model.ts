import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user-model';

@Table({ tableName: 'refresh_tokens' })
export class RefreshToken extends Model<RefreshToken> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    token: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.DATE, allowNull: false })
    expiresAt: Date;
}

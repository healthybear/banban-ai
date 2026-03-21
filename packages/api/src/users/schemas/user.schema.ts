import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
 * 用户 Schema
 * 存储用户基本信息，使用手机号作为唯一标识
 */
@Schema({ timestamps: true })
export class User {
  /** 手机号，唯一标识，用于登录 */
  @Prop({ required: true, unique: true })
  phone!: string;

  /** 用户昵称 */
  @Prop({ required: true })
  nickname!: string;

  /** 头像 URL，可选 */
  @Prop()
  avatarUrl?: string;

  /** 密码哈希，使用 bcrypt 加密存储，禁止明文 */
  @Prop({ required: true, select: false })
  passwordHash!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

/**
 * 用户服务
 * 提供用户的数据库操作：查询和创建
 */
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /** 根据手机号查找用户，用于登录验证 */
  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone }).exec();
  }

  /** 创建新用户，password 已在 AuthService 中完成哈希 */
  async create(
    phone: string,
    nickname: string,
    passwordHash: string,
  ): Promise<UserDocument> {
    return this.userModel.create({ phone, nickname, passwordHash });
  }
}

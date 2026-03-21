import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

/**
 * 认证服务
 * 负责用户注册、登录，以及签发 JWT token
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * 注册新用户
   * 对密码进行 bcrypt 哈希后存储，成功后返回 JWT token
   */
  async register(phone: string, nickname: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(phone, nickname, passwordHash);
    return this.signToken(
      (user as UserDocument & { _id: { toString(): string } })._id.toString(),
      user.phone,
    );
  }

  /**
   * 用户登录
   * 校验手机号和密码，通过后返回 JWT token
   */
  async login(phone: string, password: string) {
    const user = await this.usersService.findByPhone(phone);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('手机号或密码错误');
    }
    return this.signToken(
      (user as UserDocument & { _id: { toString(): string } })._id.toString(),
      user.phone,
    );
  }

  /** 签发 JWT token，payload 包含 userId 和 phone */
  private signToken(userId: string, phone: string) {
    return { access_token: this.jwtService.sign({ sub: userId, phone }) };
  }
}

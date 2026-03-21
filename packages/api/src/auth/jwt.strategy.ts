import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT 认证策略
 * 从请求头 Authorization: Bearer <token> 中提取并验证 JWT
 * 验证通过后将 payload 注入到 request.user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 使用 getOrThrow 确保启动时若缺少环境变量会直接报错
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * JWT 验证通过后调用，返回值会挂载到 request.user
   * Passport 要求此方法签名，实际无需 await
   */
  validate(payload: { sub: string; phone: string }) {
    return { userId: payload.sub, phone: payload.phone };
  }
}

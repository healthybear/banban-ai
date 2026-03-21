import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT 认证守卫
 * 在需要登录保护的路由上使用 @UseGuards(JwtAuthGuard)
 * 未携带有效 token 的请求将返回 401
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

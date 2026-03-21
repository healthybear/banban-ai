import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * 认证控制器
 * 处理用户注册和登录请求，返回 JWT token
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 用户注册
   * POST /auth/register
   */
  @Post('register')
  register(
    @Body() body: { phone: string; nickname: string; password: string },
  ) {
    return this.authService.register(body.phone, body.nickname, body.password);
  }

  /**
   * 用户登录
   * POST /auth/login
   */
  @Post('login')
  login(@Body() body: { phone: string; password: string }) {
    return this.authService.login(body.phone, body.password);
  }
}

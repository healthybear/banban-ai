import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * 美食记录控制器（MVP 核心）
 * 所有接口需要 JWT 认证
 */
@Controller('food')
@UseGuards(JwtAuthGuard)
export class FoodController {
  constructor(private foodService: FoodService) {}

  /**
   * 记录一次饮食
   * POST /food/record
   * TODO: 从 request.user 中提取 userId
   */
  @Post('record')
  create(
    @Body() body: { description: string; mealType?: string; calories?: number },
  ) {
    // TODO: get userId from request user
    return this.foodService.create(
      '',
      body.description,
      body.mealType,
      body.calories,
    );
  }

  /**
   * 获取当前用户所有饮食记录
   * GET /food/records
   * TODO: 从 request.user 中提取 userId
   */
  @Get('records')
  findAll() {
    // TODO: get userId from request user
    return this.foodService.findByUser('');
  }
}

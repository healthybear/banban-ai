import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * 应用启动入口
 * 端口从环境变量 PORT 读取，默认 3000
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

// void 告知 ESLint 此 Promise 有意不等待
void bootstrap();

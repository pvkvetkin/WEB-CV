import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [PrismaService, UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}

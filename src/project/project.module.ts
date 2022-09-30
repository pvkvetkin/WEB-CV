import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
  exports: [PrismaService],
})
export class ProjectModule {}

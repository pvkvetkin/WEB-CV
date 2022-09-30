import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService],
  exports: [PrismaService],
})
export class SkillModule {}

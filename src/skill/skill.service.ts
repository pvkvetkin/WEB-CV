import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SkillDto } from './dto/SkillDto';

@Injectable()
export class SkillService {
  constructor(public readonly prismaService: PrismaService) {}

  async findSkills() {
    return await this.prismaService.skill.findMany();
  }

  async findSkill(id: number) {
    const skill = await this.prismaService.skill.findUnique({
      where: { id },
    });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    return skill;
  }

  async createSkill(dto: SkillDto): Promise<SkillDto> {
    try {
      return this.prismaService.skill.create({
        data: dto,
      });
    } catch (error) {
      throw new BadRequestException("Skill didn't created");
    }
  }

  async updateSkill(id: number, dto: SkillDto) {
    try {
      return await this.prismaService.skill.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      throw new BadRequestException("Skill didn't updated");
    }
  }

  async deleteSkill(id: number) {
    try {
      return this.prismaService.skill.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException("Skill didn't deleted");
    }
  }
}

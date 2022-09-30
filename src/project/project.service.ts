import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectDto } from './dto/ProjectDto';

@Injectable()
export class ProjectService {
  constructor(public readonly prismaService: PrismaService) {}

  async findProjects() {
    return await this.prismaService.project.findMany();
  }

  async findProject(id: number) {
    const project = await this.prismaService.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async createProject(dto: ProjectDto) {
    try {
      return this.prismaService.project.create({
        data: dto,
      });
    } catch (error) {
      throw new BadRequestException("Project didn't created");
    }
  }

  async updateProject(id: number, dto: ProjectDto) {
    try {
      return await this.prismaService.project.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      throw new BadRequestException("Project didn't updated");
    }
  }

  async deleteProject(id: number) {
    try {
      return this.prismaService.project.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException("Project didn't deleted");
    }
  }
}

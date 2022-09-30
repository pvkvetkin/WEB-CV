import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  Body,
  ParseIntPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/ProjectDto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Get project',
  })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully returned.',
    type: ProjectDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get(':id')
  async getProject(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.projectService.findProject(id);
  }
  @ApiOperation({
    summary: 'Get all projects',
  })
  @ApiOperation({
    summary: 'Get all skills',
  })
  @ApiResponse({
    status: 201,
    description: 'The projects has been successfully returned.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: { title: { type: 'string' }, description: { type: "string"} },
      },
    },
  })
  @Get()
  async getProjects() {
    return await this.projectService.findProjects();
  }

  @ApiOperation({
    summary: 'Create project',
  })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
    type: ProjectDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  @Post('create')
  async createProject(@Body() project: ProjectDto) {
    return await this.projectService.createProject(project);
  }

  @ApiOperation({
    summary: 'Update skill',
  })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully updated.',
    type: ProjectDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() skill: ProjectDto,
  ) {
    return await this.projectService.updateProject(id, skill);
  }

  @ApiOperation({
    summary: 'Delete project',
  })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully deleted.',
    type: ProjectDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.projectService.deleteProject(id);
  }
}

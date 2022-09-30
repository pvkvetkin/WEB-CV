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

import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { SkillDto } from './dto/SkillDto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({
    summary: 'Get skill',
  })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully returned.',
    type: SkillDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get(':id')
  async getSkill(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.skillService.findSkill(id);
  }
  @ApiOperation({
    summary: 'Get all skills',
  })
  @ApiResponse({
    status: 201,
    description: 'The skills has been successfully returned.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: { title: { type: 'string' }, skilltype: { type: "string"} },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('')
  async getSkills() {
    return await this.skillService.findSkills();
  }

  @ApiOperation({
    summary: 'Create skill',
  })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully created.',
    type: SkillDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  @Post('create')
  @UseGuards(AuthGuard)
  async createSkill(@Body() skill: SkillDto): Promise<SkillDto> {
    return await this.skillService.createSkill(skill);
  }

  @ApiOperation({
    summary: 'Update skill',
  })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully updated.',
    type: SkillDto,
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
  async updateSkill(
    @Param('id', ParseIntPipe) id: number,
    @Body() skill: SkillDto,
  ) {
    return await this.skillService.updateSkill(id, skill);
  }

  @ApiOperation({
    summary: 'Delete skill',
  })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully deleted.',
    type: SkillDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteSkill(@Param('id', ParseIntPipe) id: number) {
    return await this.skillService.deleteSkill(id);
  }
}

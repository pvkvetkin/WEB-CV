import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  Body,
  ParseIntPipe,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserService } from './user.service';

import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/UserDto';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully returned.',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiOperation({
    summary: 'Get user',
  })
  @Get(':username')
  async getUser(
    @Param('username')
    username: string,
  ) {
    return await this.userService.findUser(username);
  }
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 201,
    description: 'The users has been successfully returned.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: { username: { type: 'string' }, email: { type: 'string' }, role: { type: "string"} },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.findUsers();
  }

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('create')
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  async createUser(
    @Body() user: UserDto,
    @Session() session: SessionContainer,
  ) {
    return await this.userService.createUser(user, session);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully deleted.',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.userService.deleteUser(id);
  }
}

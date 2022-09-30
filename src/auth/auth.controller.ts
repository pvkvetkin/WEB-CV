import { Controller, Post, Session, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Logout',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged out.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('logout')
  @UseGuards(AuthGuard)
  async postLogout(@Session() session: SessionContainer): Promise<string> {
    await session.revokeSession();
    return 'Success! User session revoked';
  }
}

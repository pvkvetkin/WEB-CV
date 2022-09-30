import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller()
export class AppController {
  @Get('')
  @Render('index')
  getIndexPage() {
    return;
  }

  @Get('/about_me')
  @Render('about_me')
  getAboutMePage() {
    return;
  }

  @Get('/admin')
  @Render('index_admin')
  @Roles(Role.AUTHOR)
  @UseGuards(AuthGuard)
  async getAdminPage() {
    return;
  }

  @Get('/login')
  @Render('login')
  getLogin() {
    return;
  }

  @Get('/auth/callback/github')
  @Render('callback')
  getCallback() {
    return;
  }
}

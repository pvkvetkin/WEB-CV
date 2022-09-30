import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
import { GetUsersService } from './get-users.service';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI:
        'https://a88bc7f1c9fb11ecb75f91af081be3a5-ap-southeast-1.aws.supertokens.io:3569',
      // "https://b5080a21c9fb11ecb75f91af081be3a5-ap-southeast-1.aws.supertokens.io:3567",
      apiKey: 'uwcHuDUdQnKlsSjmG3XJoxhq4DvYWZ',
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: 'web-sem6',
        apiDomain: 'https://web-sem6.herokuapp.com',
        websiteDomain: 'https://web-sem6.herokuapp.com',
        // apiDomain: 'http://localhost:12345',
        // websiteDomain: 'http://localhost:12345',
        apiBasePath: '/api',
        websiteBasePath: '/auth',
      },
    }),
    UserModule,
    SkillModule,
    ProjectModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    GetUsersService,
    AppGateway,
    AuthService,
    AppGateway,
  ],
})
export class AppModule {}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto } from './dto/UserDto';
import { SessionContainer } from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';

@Injectable()
export class UserService {
  constructor(public readonly prismaService: PrismaService) {}

  async findUsers() {
    return await this.prismaService.user.findMany();
  }

  async findUser(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(dto: UserDto, session: SessionContainer) {
    try {
      const userInfo = await ThirdParty.getUserById(session.getUserId());
      const email = userInfo.email;
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!user) {
        dto.username = userInfo.id;
        dto.email = userInfo.email;
        return this.prismaService.user.create({
          data: dto,
        });
      }
    } catch (error) {
      throw new BadRequestException("User didn't created");
    }
  }

  async deleteUser(id: number) {
    try {
      return this.prismaService.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException("User didn't deleted");
    }
  }
}

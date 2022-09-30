import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The supertokensID of user',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email of user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The role of user',
  })
  role: Role;
}

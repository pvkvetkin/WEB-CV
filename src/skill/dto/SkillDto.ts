import { IsNotEmpty } from 'class-validator';
import { SkillType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

// export enum SkillType {
//   PROGRAMMING_LANGUAGE = 'PROGRAMMING_LANGUAGE',
//   FRAMEWORK = 'FRAMEWORK'
// }

export class SkillDto {
  @ApiProperty({
    description: 'The title of skill',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The type of skill',
  })
  skillType: SkillType;
}

// export namespace SkillDto {
//   export enum SkillType {
//     PROGRAMMING_LANGUAGE,
//     FRAMEWORK
//   }
// }

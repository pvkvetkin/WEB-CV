import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty({
    description: 'The title of project',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of title',
  })
  description: string;
}

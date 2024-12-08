import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

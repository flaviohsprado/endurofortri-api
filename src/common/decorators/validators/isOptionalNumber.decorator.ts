import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export const IsOptionalNumber = () => {
   return applyDecorators(
      IsNumber(),
      IsOptional(),
      ApiProperty({
         required: false,
      }),
   );
};

import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export const IsOptionalDate = () => {
   return applyDecorators(
      IsDateString(),
      IsOptional(),
      ApiProperty({
         required: false,
      }),
   );
};

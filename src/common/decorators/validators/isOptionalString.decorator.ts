import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export const IsOptionalString = () => {
   return applyDecorators(
      IsOptional(),
      IsString(),
      ApiProperty({
         required: false,
      }),
   );
};

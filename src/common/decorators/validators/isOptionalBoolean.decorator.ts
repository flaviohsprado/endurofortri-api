import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export const IsOptionalBoolean = () => {
   return applyDecorators(
      IsOptional(),
      IsBoolean(),
      ApiProperty({
         required: false,
      }),
   );
};

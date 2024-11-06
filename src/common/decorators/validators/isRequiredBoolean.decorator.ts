import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export const IsRequiredBoolean = () => {
   return applyDecorators(
      IsBoolean(),
      IsNotEmpty(),
      ApiProperty({
         required: true,
      }),
   );
};

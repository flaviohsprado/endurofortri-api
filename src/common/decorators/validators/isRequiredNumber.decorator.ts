import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export const IsRequiredNumber = () => {
   return applyDecorators(
      IsNumber(),
      IsNotEmpty(),
      ApiProperty({
         required: true,
      }),
   );
};

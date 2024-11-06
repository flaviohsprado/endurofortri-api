import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export const IsRequiredDate = () => {
   return applyDecorators(
      IsDateString(),
      IsNotEmpty(),
      ApiProperty({
         required: true,
      }),
   );
};

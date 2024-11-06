import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export const IsRequiredModel = (modelTypeField?: any) => {
   return applyDecorators(
      IsNotEmpty({
         each: true,
         context: { modelTypeField },
      }),
      ApiProperty({
         required: true,
      }),
   );
};

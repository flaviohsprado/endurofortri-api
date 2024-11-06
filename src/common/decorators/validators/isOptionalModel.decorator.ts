import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export const IsOptionalModel = (modelTypeField?: any) => {
   return applyDecorators(
      IsOptional({ each: true, context: { modelTypeField } }),
      ApiProperty({
         required: false,
      }),
   );
};

import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export const IsOptionalArray = (props: ApiPropertyOptions) => {
   return applyDecorators(
      IsOptional(),
      IsArray(),
      // @ts-ignore
      ApiProperty({
         required: false,
         ...props,
      }),
   );
};
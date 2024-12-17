import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export const IsOptionalObject = (props: ApiPropertyOptions) => {
   return applyDecorators(
      IsObject(),
      IsOptional(),
      // @ts-ignore
      ApiProperty({
         required: false,
         ...props,
      }),
   );
};

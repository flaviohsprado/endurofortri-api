import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { Column, ColumnOptions } from 'typeorm';

export const IsOptionalStringColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      IsOptional(),
      IsString(),
      Column({ nullable: true, ...props }),
   );
};

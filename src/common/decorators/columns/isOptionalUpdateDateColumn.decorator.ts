import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { ColumnOptions, UpdateDateColumn } from 'typeorm';

export const IsOptionalUpdateDateColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      IsOptional(),
      IsString({
         message: '$property must be a string',
      }),
      UpdateDateColumn({ nullable: true, ...props }),
   );
};

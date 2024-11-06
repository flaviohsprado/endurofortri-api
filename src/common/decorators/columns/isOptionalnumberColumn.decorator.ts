import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions } from 'typeorm';

export const IsOptionalNumberColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      Column({
         type: 'decimal',
         transformer: {
            from(value: string) {
               return parseFloat(value);
            },
            to(value: number) {
               return value;
            },
         },
         nullable: true,
         ...props,
      }),
   );
};

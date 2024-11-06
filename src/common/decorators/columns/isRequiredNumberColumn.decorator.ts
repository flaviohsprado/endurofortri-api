import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Column, ColumnOptions } from 'typeorm';

export const IsRequiredNumberColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      Column({
         ...props,
         type: 'decimal',
         transformer: {
            from(value: string) {
               return parseFloat(value);
            },
            to(value: number) {
               return value;
            },
         },
      }),
      IsNotEmpty({
         message: '$property must not be empty',
      }),
   );
};

import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Column, ColumnOptions } from 'typeorm';

export const IsRequiredColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      Column({ ...props }),
      IsNotEmpty({
         message: '$property must not be empty',
      }),
   );
};
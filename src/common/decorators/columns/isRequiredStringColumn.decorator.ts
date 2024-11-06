import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, ColumnOptions } from 'typeorm';

export const IsRequiredStringColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      Column(props),
      IsString({
         message: '$property must be a string',
      }),
      IsNotEmpty({
         message: '$property must not be empty',
      }),
   );
};

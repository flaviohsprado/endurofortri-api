import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions } from 'typeorm';

export const IsOptionalBooleanColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      Column({
         type: 'boolean',
         transformer: {
            from(value: string) {
               return value === 'true';
            },
            to(value: boolean) {
               return value;
            },
         },
         nullable: true,
         ...props,
      }),
   );
};

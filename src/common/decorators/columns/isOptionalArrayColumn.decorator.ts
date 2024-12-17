import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions } from 'typeorm';

export const IsOptionalArrayColumn = (props?: ColumnOptions) => {
   return applyDecorators(
      Column({
         type: 'jsonb',
         array: true,
         transformer: {
            from(value: string) {
               return JSON.parse(value);
            },
            to(value: any) {
               return JSON.stringify(value);
            },
         },
         nullable: true,
         ...props,
      }),
   );
};

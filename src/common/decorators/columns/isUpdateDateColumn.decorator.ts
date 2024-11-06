import { applyDecorators } from '@nestjs/common';
import { ColumnOptions, UpdateDateColumn } from 'typeorm';

export const IsUpdateDateColumn = (props?: ColumnOptions) => {
   return applyDecorators(UpdateDateColumn({ nullable: false, ...props }));
};

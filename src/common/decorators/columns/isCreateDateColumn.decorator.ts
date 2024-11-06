import { applyDecorators } from '@nestjs/common';
import { ColumnOptions, CreateDateColumn } from 'typeorm';

export const IsCreateDateColumn = (props?: ColumnOptions) => {
   return applyDecorators(CreateDateColumn({ nullable: false, ...props }));
};

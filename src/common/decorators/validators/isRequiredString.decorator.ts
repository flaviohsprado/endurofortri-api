import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidationOptions } from 'class-validator';

export const IsRequiredString = (
   validationOptions?: ValidationOptions,
   options?: ApiPropertyOptions,
) => {
   const optionsAux = {
      type: String,
      ...options,
      required: true,
   } as ApiPropertyOptions;

   return applyDecorators(
      IsString(validationOptions),
      IsNotEmpty(),
      ApiProperty(optionsAux),
   );
};

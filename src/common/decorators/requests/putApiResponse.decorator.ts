import { applyDecorators, Put, Type } from '@nestjs/common';
import {
   ApiBadRequestResponse,
   ApiForbiddenResponse,
   ApiHeader,
   ApiInternalServerErrorResponse,
   ApiNotFoundResponse,
   ApiOkResponse,
   ApiRequestTimeoutResponse,
   ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const PutApiResponse = <TModel extends Type<any>>(
   model: TModel,
   param: string,
   isArray = false,
) => {
   return applyDecorators(
      Put(param),
      ApiHeader({
         name: 'Authorization',
         description: 'Bearer token',
         required: true,
         example:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlkIjoiZGE2ZGI0N2MtN2ZlYS00ZDc0LThjYWUtZjA2Mjg1N2JiMGMyIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.YLqRWhmGpB9ymV3ukLZ11AqST-PWZbJEUzX0YUhVt9I',
      }),
      ApiOkResponse({
         description: 'The object has been successfully updated.',
         type: isArray ? [model] : model,
      }),
      ApiBadRequestResponse({
         description:
            'Client specified an invalid argument, request body or query param.',
      }),
      ApiUnauthorizedResponse({
         description: 'The user is unauthorized.',
      }),
      ApiForbiddenResponse({
         description:
            'Authenticated user is not allowed to access this resource.',
      }),
      ApiNotFoundResponse({
         description: 'The resource was not found.',
      }),
      ApiInternalServerErrorResponse({
         description: 'Internal server error.',
      }),
      ApiRequestTimeoutResponse({
         description: 'Request timeout.',
      }),
   );
};

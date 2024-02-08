import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetReferee = createParamDecorator(
  (data, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.refereeNumber;
  },
);

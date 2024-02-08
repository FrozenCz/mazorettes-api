import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtModuleOptions } from './jwt.config';
import { AuthService } from './auth.service';

export interface JwtPayloadInterface {
  user: string;
  refereeNumber: number | undefined;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtModuleOptions.secret,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<JwtPayloadInterface> {
    if (await this.authService.isValid(payload.user)) {
      return { user: payload.user, refereeNumber: payload.refereeNumber };
    }
    throw new UnauthorizedException();
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtModuleOptions } from './jwt.config';
import { AuthService } from './auth.service';

export interface JwtPayloadInterface {
  logon: string;
  rights: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtModuleOptions.secret,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<boolean> {
    if (await this.authService.isValid(payload.logon)) {
      return true;
    }
    throw new UnauthorizedException();
  }
}

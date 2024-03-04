import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private user = 'mazoretky';
  private pass = 'spickyProtahnout123!';

  constructor(private jwtService: JwtService) {}

  async login(param: {
    user: string;
    pass: string;
  }): Promise<{ access_token: string }> {
    if (param.user === this.user && param.pass === this.pass) {
      const payload = { user: this.user };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException('Aaaaah....');
  }

  async isValid(user: string): Promise<boolean> {
    return this.user === user;
  }

  async setReferee(refereeNumber: number) {
    const payload = { user: this.user, refereeNumber };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

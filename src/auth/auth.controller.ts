import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './model';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body(ValidationPipe) loginDTO: LoginDTO,
  ): Promise<{ access_token: string }> {
    return this.authService.login({ pass: loginDTO.pass, user: loginDTO.name });
  }

  @UseGuards(AuthGuard())
  @Post('referee')
  setReferee(@Body('refereeNumber', ParseIntPipe) refereeNumber: number) {
    if (refereeNumber >= 0 && refereeNumber < 5) {
      return this.authService.setReferee(refereeNumber);
    }
  }
}

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './model';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body(ValidationPipe) loginDTO: LoginDTO,
  ): Promise<{ access_token: string }> {
    return this.authService.login({ pass: loginDTO.pass, user: loginDTO.name });
  }
}

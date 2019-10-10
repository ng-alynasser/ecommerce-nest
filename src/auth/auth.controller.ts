import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { Payload } from '../types/payload';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.singPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.singPayload(payload);
    return { user, token };
  }
}

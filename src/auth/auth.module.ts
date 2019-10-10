import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}

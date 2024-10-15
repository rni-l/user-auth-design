import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto } from './dto/user.dto';

@Controller('cas')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() dto: RegisterUserDto) {
    return this.usersService.create(dto);
  }

  @Post('/login')
  findOne(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }
}

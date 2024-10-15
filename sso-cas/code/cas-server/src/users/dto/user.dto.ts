/*
 * @Author: Lu
 * @Date: 2024-10-14 16:49:15
 * @LastEditTime: 2024-10-14 17:10:44
 * @LastEditors: Lu
 * @Description:
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '账号' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly pwd: string;
}
export class LoginUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '账号' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly pwd: string;
}

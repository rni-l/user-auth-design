import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { generateRandomString } from 'src/utils';
import {
  KEY_SESSION_ID,
  KEY_USER_SESSION,
  KEY_USER_TICKETS,
  TUserSession,
  TUserTicket,
} from 'src/constants';

const generateTGT = () => `TGT_${generateRandomString()}`;
const generateTGC = () => `TGC_${generateRandomString()}`;
const generateST = () => `ST_${generateRandomString()}`;
const generateSESSION_ID = () => `SI_${generateRandomString(8)}`;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async create(dto: RegisterUserDto) {
    await this.user
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: dto.name,
          // TODO: 密码加密
          pwd: dto.pwd,
        },
      ])
      .execute();
    return 'ok';
  }

  findOne(id: number) {
    return this.user.findOne({
      where: { id },
      select: ['name', 'id', 'createdAt'],
    });
  }

  async login(dto: LoginUserDto) {
    // TODO: 密码加密
    const user = await this.user.findOne({
      where: dto,
      select: ['name', 'id', 'createdAt'],
    });
    // 生成 TGT, ST, TGC
    const TGT = generateTGT();
    const TGC = generateTGC();
    const ST = generateST();
    const SESSION_ID = generateSESSION_ID();
    // 设置票据
    const cacheList =
      (await this.cacheManager.get<TUserTicket[]>(KEY_USER_TICKETS)) ||
      ([] as TUserTicket[]);
    console.log(JSON.stringify(cacheList));
    cacheList.push({
      TGT,
      TGC,
      userInfo: {
        name: user.name,
        id: user.id,
      },
    });
    await this.cacheManager.set(KEY_USER_TICKETS, cacheList);
    // 设置 ST
    const sessionList =
      (await this.cacheManager.get<TUserSession[]>(KEY_USER_SESSION)) ||
      ([] as TUserSession[]);
    sessionList.push({
      ST,
      TGC,
      SESSION_ID,
    });
    await this.cacheManager.set(KEY_USER_SESSION, sessionList);
    return user;
  }
}

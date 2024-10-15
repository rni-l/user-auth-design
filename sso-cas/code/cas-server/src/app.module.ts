import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFilesByNodeEnv } from './utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
const { NODE_ENV } = process.env;
console.log('NODE_ENV', NODE_ENV);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilesByNodeEnv(NODE_ENV),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_NAME'),
          password: configService.get('DB_PWD'),
          database: configService.get('DB_DATABASE'),
          entities: [User],
          logging: true,
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
    CacheModule.register<RedisClientOptions>({
      // useFactory: async () => ({
      //   store: redisStore,

      //   // Store-specific configuration:
      //   host: 'localhost',
      //   port: 6379,
      // }),
      store: redisStore,

      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
      ttl: 1000 * 60 * 60 * 12,
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

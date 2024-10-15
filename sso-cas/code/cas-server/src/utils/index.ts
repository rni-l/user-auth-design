/*
 * @Author: Lu
 * @Date: 2024-10-13 11:38:30
 * @LastEditTime: 2024-10-14 17:51:44
 * @LastEditors: Lu
 * @Description:
 */

import * as crypto from 'crypto';

export const cryptoText = (text: string) => {
  // 创建一个哈希实例
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
};

export const getEnvFilesByNodeEnv = (env?: string): string[] => {
  if (env === 'development') return ['.env', '.env.development'];
  if (env === 'production') return ['.env', '.env.production'];
  return ['.env', '.env.development.local'];
};

export const generateRandomString = (length = 16) => {
  // 可能的字符集
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    // 生成一个随机的数组索引
    const randomIndex = crypto.randomInt(0, charactersLength);
    // 累加随机字符
    result += characters[randomIndex];
  }

  return result;
};

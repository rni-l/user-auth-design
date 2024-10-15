/*
 * @Author: Lu
 * @Date: 2024-10-14 17:42:07
 * @LastEditTime: 2024-10-15 17:31:22
 * @LastEditors: Lu
 * @Description:
 */
export const KEY_TGT = 'TGT';
export const KEY_TGC = 'TGC';
export const KEY_ST = 'ST';
export const KEY_SESSION_ID = 'KEY_SESSION_ID';
export const KEY_USER_TICKETS = 'KEY_USER_TICKETS';
export const KEY_USER_SESSION = 'KEY_USER_SESSION';
export type TUserTicket = {
  TGT: string;
  TGC: string;
  userInfo: { name: string; id: number };
};
export type TUserSession = {
  ST: string;
  TGC: string;
  SESSION_ID: string;
};

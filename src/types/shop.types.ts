import { TUser } from './user.types';

export type TShop = {
  id?: string;
  name: string;
  logo?: string;
  status?:string;
  user?: TUser | string;
  createdAt?: string;
  description: string;
};

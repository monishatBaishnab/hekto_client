import { TUser } from './user.types';

export type TOrderProduct = {
  product: {
    id: string;
    name: string;
    images: string;
  };
}

export type TOrder = {
  id: string;
  user_id: string;
  order_status: 'PENDING' | 'COMPLETED' | 'CANCELED';
  payment_status: 'PENDING' | 'PAID' | 'FAILED';
  payment_method: 'AMARPAY';
  transaction_id: string;
  total_price: number;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  orderProduct: TOrderProduct[];
  user: TUser;
}

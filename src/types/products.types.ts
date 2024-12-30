/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from './categories.types';
import { TReview } from './review.types';
import { TShop } from './shop.types';

export type TProduct = {
  productCategory: any;
  id: string;
  shop_id: string;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  description: string;
  flash_sale: boolean;
  featured: boolean;
  images: string[];
  discount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  shop: TShop;
  review: TReview[];
  categories: string[] | TCategory[];
};

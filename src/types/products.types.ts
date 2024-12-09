import { TCategory } from './categories.types';
import { TReview } from './review.types';
import { TShop } from './shop.types';

export type TProduct = {
  id: string;
  shop_id: string;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  description: string;
  images: string;
  discount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  shop: TShop;
  review: TReview[];
  categories: string[] | TCategory[];
};

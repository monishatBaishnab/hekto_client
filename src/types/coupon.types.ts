export type TCoupon = {
  id: string;
  shop_id: string;
  discount: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  coupon: string;
  discount_by: 'AMOUNT' | 'PERCENTAGE';
  is_active: boolean;
  start_date: Date;
  end_date: Date;
};

export interface TReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

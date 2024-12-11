export interface TReview {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
    email: string;
    address: string;
    profilePhoto: string;
    createdAt:string;
  };
  product: {
    name: string;
  };
}

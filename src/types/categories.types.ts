export type TCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  categoryProduct?: { _count: number };
  updatedAt: string;
};

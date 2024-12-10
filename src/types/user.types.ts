export type TUser = {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: string;
  email: string;
  password: string;
  address: string | null;
  profilePhoto?: string | null;
};

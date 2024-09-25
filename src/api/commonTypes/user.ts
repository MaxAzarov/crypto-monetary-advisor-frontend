export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

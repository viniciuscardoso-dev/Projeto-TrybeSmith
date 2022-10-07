export interface IProduct {
  id?: number,
  name: string,
  amount: string,
  orderId?: number
}

export interface IUser {
  id?: number,
  username: string,
  classe?: string,
  level?: number,
  password?: string
}

export interface IOrder {
  id: number,
  userId: number,
  productsIds: number[],
}

export class GenericError extends Error {
  // public details: { message: string }[];
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
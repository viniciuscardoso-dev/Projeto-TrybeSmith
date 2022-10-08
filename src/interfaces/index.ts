export interface IProduct {
  id?: number,
  name: string,
  amount: string,
  orderId?: number | null
}

export interface IUser {
  id?: number,
  username: string,
  classe?: string,
  level?: number,
  password?: string
}

export interface IOrder {
  id?: number,
  userId?: number,
  productsIds: number[],
}

export class GenericError extends Error {
  public statusCode: number | undefined;

  constructor(message: string, statusCode: number | undefined) {
    super(message);
    this.statusCode = statusCode;
  }
}

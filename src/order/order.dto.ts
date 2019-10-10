export interface CreateOrderDTO {
  products: Array<{
    product: string;
    quantity: number;
  }>;
}

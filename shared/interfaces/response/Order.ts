import { ProductVariant } from '@/shared/interfaces/response/ProductVariant';

export interface Order {
  id?: number;
  code: string;
  stage: string;
  address: {
    id: number;
    full_name: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    detail: string;
  };
  discount_ticket: number[];
  owner: {
    id: number;
    full_name: string;
    phone: string;
    email: string;
  };
  payment_method: string;
  subtotal: number;
  discount: number;
  amount: number;
  order_items: {
    id: number;
    product_variant: ProductVariant;
    quantity: number;
  }[];
  transaction: {
    paid_at: Date;
  };
}

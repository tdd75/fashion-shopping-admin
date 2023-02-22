import { Product } from './Product';
export interface ProductVariant {
  id?: number;
  color: string;
  size: string;
  stocks: number;
  price: number;
  product?: Product;
}

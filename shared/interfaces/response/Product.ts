import { ProductVariant } from '@/shared/interfaces/response/ProductVariant';

export interface Product {
  id?: number;
  name: string;
  image: string;
  stocks: number;
  price_range: number[];
  description: string;
  variants: ProductVariant[] | null;
}

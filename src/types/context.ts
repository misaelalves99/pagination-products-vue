import type { Product } from "./product";

export type ProductContextState = {
  products: Product[];
  loading: boolean;
  error: string;
};

export interface ProductContextType {
  state: ProductContextState;
  fetchProducts: () => Promise<void>;
}

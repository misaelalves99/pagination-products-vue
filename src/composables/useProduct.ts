import { ref, readonly } from "vue";
import type { Product } from "../types/product";
import { getProducts } from "../services/productService";

const products = ref<Product[]>([]);

const setProducts = (newProducts: Product[]) => {
  products.value = newProducts;
};

const fetchProducts = async (): Promise<void> => {
  try {
    const fetched = await getProducts();
    setProducts(fetched);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
  }
};

export function useProduct() {
  return {
    products: readonly(products),
    fetchProducts,
  };
}

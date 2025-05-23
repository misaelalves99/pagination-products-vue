// src/context/useProduct.ts

import { inject } from "vue";
import type { ProductContextType } from "../types/context";
import { ProductSymbol } from "../context/ProductSymbol";

export function useProduct(): ProductContextType {
  const context = inject<ProductContextType>(ProductSymbol);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider.");
  }
  return context;
}

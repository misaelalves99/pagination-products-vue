// src/context/ProductProvider.vue

<script setup lang="ts">
import { reactive, provide, onMounted } from "vue";
import type { ProductContextState, ProductContextType } from "../types/context";
import { getProducts } from "../services/productService";
import { ProductSymbol } from "./ProductSymbol";

const state = reactive<ProductContextState>({
  products: [],
  loading: false,
  error: "",
});

async function fetchProducts(): Promise<void> {
  state.loading = true;
  state.error = "";
  try {
    const data = await getProducts();
    state.products = data;
  } catch (error) {
    state.error = "Erro ao buscar produtos";
    console.error("Erro ao buscar produtos:", error);
  } finally {
    state.loading = false;
  }
}

onMounted(() => {
  fetchProducts();
});

const context: ProductContextType = {
  state,
  fetchProducts,
};

provide(ProductSymbol, context);
</script>

<template>
  <slot />
</template>

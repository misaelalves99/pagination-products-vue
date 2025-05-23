<!-- src/components/ProductList.vue -->

<template>
  <div>
    <div v-if="loading" class="loading">Carregando produtos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <p v-else-if="!products.length" class="noProductsMessage">
      Nenhum produto encontrado.
    </p>
    <div v-else>
      <div class="productGrid">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div class="paginationWrapper">
        <Pagination
          :totalPages="totalPages"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard.vue";
import Pagination from "./Pagination.vue";
import { useProduct } from "../context/useProduct";

const { state } = useProduct();

const loading = computed(() => state.loading);
const error = computed(() => state.error);
const products = computed(() => state.products);

const currentPage = ref(1);
const itemsPerPage = 20;

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage)
);

const paginatedProducts = ref<Product[]>([]);

function updatePaginatedProducts() {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  paginatedProducts.value = products.value.slice(startIndex, endIndex);
}

function handlePageChange(page: number) {
  currentPage.value = page;
}

watch([currentPage, products], updatePaginatedProducts, {
  immediate: true,
});
</script>

<style scoped>
.productGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.paginationWrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
}

.error {
  color: #d9534f;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 50px;
}

.noProductsMessage {
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  margin-top: 50px;
}

.filterContainer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.filterButton {
  background-color: #5bc0de;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.filterButton:hover {
  background-color: #31b0d5;
}

.filterButton:focus {
  outline: none;
}

@media (max-width: 768px) {
  .productGrid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .filterContainer {
    flex-direction: column;
    gap: 10px;
  }

  .filterButton {
    width: 100%;
    padding: 12px;
  }
}
</style>

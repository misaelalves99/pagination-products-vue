<!-- src/pages/home/HomePage.vue -->

<template>
  <main class="container">
    <section class="hero">
      <h1 class="title">Bem-vindo ao Nosso E-commerce</h1>
      <p class="description">Explore nossos produtos incríveis!</p>
      <button class="heroButton" @click="handleNavigate">
        Ver Produtos
      </button>
    </section>

    <section class="featuredSection">
      <h2 class="sectionTitle">Produtos em Destaque</h2>
      <ProductList :overrideProducts="products.slice(0, 6)" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import ProductList from "../../components/ProductList.vue";
import { useProduct } from "../../context/useProduct";

const router = useRouter();
const { state } = useProduct();

const products = computed(() => state.products);

function handleNavigate() {
  router.push("/products");
}
</script>

<style scoped>
.container {
  padding: 2rem 0;
  background-color: #f5f5f5;
}

.hero {
  background-color: #333;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.heroButton {
  background-color: #ff5722;
  color: white;
  font-size: 1.125rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.heroButton:hover {
  background-color: #e64a19;
}

.featuredSection {
  margin-top: 3rem;
  padding: 2rem 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.sectionTitle {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
}
</style>

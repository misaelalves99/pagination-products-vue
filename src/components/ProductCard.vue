<!-- src/components/ProductCard.vue -->

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Product } from "../types/product";
import { Heart, ShoppingCart } from "lucide-vue-next";

interface Props {
  product: Product;
  onBuyNow?: (product: Product) => void;
}
const props = defineProps<Props>();

const isFavorite = ref(false);

const updateFavoriteStatus = () => {
  const storedFavorites: Product[] = JSON.parse(localStorage.getItem("favorites") || "[]");
  isFavorite.value = storedFavorites.some(item => item.id === props.product.id);
};

onMounted(() => {
  updateFavoriteStatus();
});

watch(() => props.product.id, () => {
  updateFavoriteStatus();
});

function toggleFavorite() {
  const storedFavorites: Product[] = JSON.parse(localStorage.getItem("favorites") || "[]");
  const alreadyFavorited = storedFavorites.some(item => item.id === props.product.id);

  const updatedFavorites = alreadyFavorited
    ? storedFavorites.filter(item => item.id !== props.product.id)
    : [...storedFavorites, props.product];

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  isFavorite.value = !alreadyFavorited;
}

function handleBuyNow() {
  props.onBuyNow?.(props.product);
}
</script>

<template>
  <div class="card">
    <div class="imageWrapper">
      <img
        :src="product.imageUrl || '/images/product-placeholder.png'"
        :alt="product.name"
        width="300"
        height="300"
        class="productImage"
      />

      <button @click="toggleFavorite" class="favoriteIcon" aria-label="Toggle favorite">
        <Heart v-if="isFavorite" :size="22" color="red" fill="red" />
        <Heart v-else :size="22" color="gray" fill="none" />
      </button>
    </div>

    <div class="details">
      <h3 class="productName">{{ product.name }}</h3>
      <p class="productDescription">{{ product.description }}</p>
      <p class="productPrice">R$ {{ product.price.toFixed(2) }}</p>

      <div class="buttonGroup">
        <button class="cartButton" aria-label="Adicionar ao carrinho">
          <ShoppingCart :size="22" />
        </button>
        <button class="buyButton" @click="handleBuyNow">
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.imageWrapper {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.productImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.productImage:hover {
  transform: scale(1.05);
}

.details {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 230px;
}

.productName {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-transform: capitalize;
}

.productDescription {
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 16px;
  line-height: 1.4;
}

.productPrice {
  font-size: 1.1rem;
  font-weight: 500;
  color: #d9534f;
  margin-bottom: 16px;
}

.buttonGroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.cartButton {
  width: 42px;
  height: 42px;
  padding: 0;
  background-color: #5bc0de;
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buyButton {
  flex: 1;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}

.cartButton:hover {
  background-color: #31b0d5;
}

.buyButton:hover {
  background-color: #218838;
}

button:focus {
  outline: none;
}

@media (max-width: 768px) {
  .buttonGroup {
    flex-direction: column;
    align-items: stretch;
  }

  .cartButton,
  .buyButton {
    width: 100%;
  }
}

.favoriteIcon {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
}
</style>

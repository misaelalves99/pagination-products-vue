<!-- src/App.vue -->
 
<template>
  <ProductProvider>
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </ProductProvider>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import ProductProvider from "./context/ProductProvider.vue";

onMounted(() => {
  document.documentElement.lang = "pt-BR";
  document.title = "Minha Loja";
});
</script>

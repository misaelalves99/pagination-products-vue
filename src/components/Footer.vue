<!-- src/components/Footer.vue -->

<template>
  <footer class="footer">
    <div class="container">
      <p class="text">
        &copy; {{ currentYear }} E-commerce. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: #222;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text {
  font-size: 0.9rem;
}
</style>

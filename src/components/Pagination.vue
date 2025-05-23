<!-- src/components/Pagination.vue -->

<template>
  <div class="paginationContainer">
    <button
      class="pageButton"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Anterior
    </button>

    <span class="currentPage">{{ currentPage }}</span>

    <button
      class="pageButton"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Próximo
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

import { ref } from "vue";

const currentPage = ref(1);

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
    emit("pageChange", page);
  }
}
</script>

<style scoped>
.paginationContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.pageButton {
  padding: 0.5rem 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: background-color 0.2s;
}

.pageButton:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.currentPage {
  font-size: 1.2rem;
  margin: 0 1rem;
}
</style>

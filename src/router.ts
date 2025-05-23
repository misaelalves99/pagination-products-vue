import { createRouter, createWebHistory } from 'vue-router';

// Importação de páginas da pasta "pages"
import HomePage from './pages/home/HomePage.vue';
import ProductsPage from './pages/products/ProductsPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/products', name: 'Products', component: ProductsPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // fallback para páginas inexistentes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

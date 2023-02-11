import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import InboxView from '@/views/inbox/InboxView.vue';
import ProductView from '@/views/product/ProductView.vue';
import OrderView from '@/views/order/OrderView.vue';

const routes = [
  {
    path: '/',
    redirect: '/admin/',
  },
  {
    path: '/admin/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: HomeView,
        meta: {
          title: 'Home',
          requiresAuth: true,
        },
      },
      {
        path: 'inbox/',
        component: InboxView,
        meta: {
          title: 'Inbox',
          requiresAuth: true,
        },
      },
      {
        path: 'product/',
        component: ProductView,
        meta: {
          title: 'Product',
          requiresAuth: true,
        },
      },
      {
        path: 'order/',
        component: OrderView,
        meta: {
          title: 'Order',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/admin/auth/login/',
    component: LoginView,
    meta: {
      title: 'Login',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
